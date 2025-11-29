import html2canvas from "html2canvas";

export interface ShareImageOptions {
    element: HTMLElement;
    title: string;
    text: string;
    url?: string;
    fileName?: string;
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    document.body.appendChild(link); // Required for some browsers
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const shareElementAsImage = async ({
    element,
    title,
    text,
    url = window.location.href,
    fileName = "share-image.png",
    onSuccess,
    onError,
}: ShareImageOptions) => {
    const fullShareText = `${title}\n\n${text}\n\n${url}`;

    const shareTextOnly = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: fullShareText,
                });
                onSuccess?.();
            } catch (err) {
                console.error("Text share failed:", err);
                copyToClipboard();
            }
        } else {
            copyToClipboard();
        }
    };

    const copyToClipboard = async (customMessage?: string) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(fullShareText);
            } else {
                // Fallback for HTTP/Dev environments where navigator.clipboard is undefined
                const textArea = document.createElement("textarea");
                textArea.value = fullShareText;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            if (customMessage) {
                console.log(`[Share] Clipboard success: ${customMessage}`);
            } else {
                console.log("[Share] Text copied to clipboard.");
            }

            onSuccess?.();
        } catch (err) {
            console.error("Clipboard failed:", err);
            onError?.(err);
        }
    };

    try {
        // Temporarily remove transform/transition/opacity for clean capture
        const originalTransform = element.style.transform;
        const originalTransition = element.style.transition;
        const originalOpacity = element.style.opacity;
        const originalBackground = element.style.background;

        element.style.transform = "none";
        element.style.transition = "none";
        element.style.opacity = "1";
        // Apply a nice gradient for the share image
        element.style.background = "radial-gradient(circle at center, #292524 0%, #0c0a09 100%)";

        // Force background color for capture (transparent otherwise)
        const canvas = await html2canvas(element, {
            backgroundColor: null, // Use the element's background (our gradient)
            scale: 2, // Higher quality
            logging: false,
            useCORS: true,
            allowTaint: true, // Try to allow tainted images (might still fail export)
            ignoreElements: (element) => {
                // Ignore elements with specific class if needed, e.g., external textures causing CORS
                return element.classList.contains("ignore-capture");
            },
            onclone: (clonedDoc) => {
                try {
                    console.log("[Share] Starting aggressive oklab/oklch sanitization...");

                    // Helper to convert a single color string (e.g. "oklab(...)") to RGB/Hex via Canvas
                    const toRgb = (color: string) => {
                        if (!ctx) return "#000000";
                        try {
                            ctx.fillStyle = color;
                            const computed = ctx.fillStyle;
                            if (!computed || computed.includes("oklab") || computed.includes("oklch")) {
                                return "#000000";
                            }
                            return computed;
                        } catch (e) {
                            return "#000000";
                        }
                    };

                    // Helper to replace all oklab(...)/oklch(...) occurrences in a string
                    const sanitizeString = (value: string) => {
                        if (!value || typeof value !== 'string') return value;
                        if (!value.includes("oklab") && !value.includes("oklch")) return value;
                        return value.replace(/(oklab|oklch)\([^)]+\)/g, (match) => {
                            return toRgb(match);
                        });
                    };

                    const ctx = document.createElement("canvas").getContext("2d");
                    let replacements = 0;

                    // 1. Sanitize <style> tags content (CRITICAL for CSS variables)
                    const styleTags = clonedDoc.querySelectorAll("style");
                    styleTags.forEach(styleTag => {
                        if (styleTag.innerHTML.includes('oklab') || styleTag.innerHTML.includes('oklch')) {
                            // Simple regex replacement for the whole block
                            const newCss = styleTag.innerHTML.replace(/(oklab|oklch)\([^)]+\)/g, "#000000");
                            styleTag.innerHTML = newCss;
                            replacements++;
                        }
                    });

                    // 2. Sanitize Computed Styles (Inline Styles)
                    const allElements = clonedDoc.querySelectorAll("*");
                    allElements.forEach((el) => {
                        const element = el as HTMLElement;
                        // We iterate styles that might contain colors
                        const props = [
                            'color', 'backgroundColor', 'borderColor', 'boxShadow', 'background', 'backgroundImage',
                            'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
                            'outlineColor', 'textDecorationColor', 'fill', 'stroke'
                        ];

                        const style = window.getComputedStyle(element);

                        props.forEach(prop => {
                            // @ts-ignore
                            const val = style[prop];
                            if (val && (val.includes('oklab') || val.includes('oklch'))) {
                                // Force override with a safe color (white for text, transparent/black for others)
                                let safeVal = '#000000';
                                if (prop === 'color') safeVal = '#ffffff';
                                if (prop.includes('background')) safeVal = 'rgba(0,0,0,0)'; // Default to transparent for bg to avoid blocks

                                // Specific overrides for our app's look
                                if (prop === 'color') {
                                    element.style.color = '#e7e5e4'; // Stone-200
                                } else if (prop === 'backgroundColor') {
                                    // Try to keep transparency if possible, otherwise dark
                                    element.style.backgroundColor = '#0c0a09'; // Stone-950
                                } else {
                                    // @ts-ignore
                                    element.style[prop] = safeVal;
                                }
                                replacements++;
                            }
                        });

                        // 3. Sanitize SVG Attributes explicitly
                        if (element instanceof SVGElement) {
                            const svgAttrs = ['fill', 'stroke'];
                            svgAttrs.forEach(attr => {
                                const val = element.getAttribute(attr);
                                if (val && (val.includes('oklab') || val.includes('oklch'))) {
                                    element.setAttribute(attr, '#3f1d1d'); // Default dark red for heart/blood
                                    replacements++;
                                }
                            });
                        }
                    });

                    console.log(`[Share] Sanitization finished. Replaced ~${replacements} instances.`);
                } catch (e) {
                    console.error("Sanitization error:", e);
                }
            },
        });

        // Restore styles
        element.style.transform = originalTransform;
        element.style.transition = originalTransition;
        element.style.opacity = originalOpacity;
        element.style.background = originalBackground; // Restore the original background

        // Convert to blob/file SYNCHRONOUSLY to try and save the user gesture
        // canvas.toBlob is async and kills the gesture on iOS often.
        // toDataURL is sync.
        const dataUrl = canvas.toDataURL("image/png");

        // Manual Base64 to Blob conversion (Sync)
        const byteString = atob(dataUrl.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'image/png' });

        if (blob) {
            const file = new File([blob], fileName, { type: "image/png" });

            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                try {
                    await navigator.share({
                        title: title,
                        text: fullShareText,
                        files: [file],
                    });
                    onSuccess?.();
                } catch (err: any) {
                    console.error("[Share] Image share failed:", err);

                    if (err.name === 'AbortError') {
                        console.log("[Share] User cancelled share.");
                        return;
                    }

                    console.log("[Share] Falling back to download due to error.");
                    downloadBlob(blob, fileName);
                }
            } else {
                console.log("[Share] Navigator.share not supported or file sharing not allowed (Likely due to HTTP/Insecure Context).");

                // Fallback: Browser doesn't support file share
                // Try to share text natively first!
                let textShared = false;
                if (navigator.share) {
                    try {
                        console.log("[Share] Attempting text-only share...");
                        await navigator.share({
                            title: title,
                            text: fullShareText,
                        });
                        textShared = true;
                        console.log("[Share] Text-only share successful.");
                    } catch (err) {
                        console.warn("[Share] Text-only share failed:", err);
                    }
                }

                if (!textShared) {
                    console.log("[Share] Copying text to clipboard as last resort.");
                    copyToClipboard();
                }

                console.log("[Share] Downloading image as fallback.");
                downloadBlob(blob, fileName);
            }
        } else {
            // Blob generation failed
            console.warn("Blob generation failed, falling back to text share");
            await shareTextOnly();
        }
    } catch (error: any) {
        console.error("Capture failed:", error);
        // Debug for iOS
        // alert(`Capture Error: ${error.message}`);

        // Fallback to text only share if capture crashes (e.g. oklab error)
        await shareTextOnly();
    }
};

/**
 * Handles the share functionality for any element with the `data-share-btn` attribute.
 * Expects the element to have a `data-share-text` attribute with the content to share.
 * Optional: `data-share-target-id` to capture an element as image.
 * Optional: `data-share-filename` to specify the filename for the image.
 * Appends the current URL to the shared text.
 */
export async function handleGlobalShare(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const btn = target.closest("[data-share-btn]");

    // If the click is not on a share button, ignore it
    if (!btn) return;

    const element = btn as HTMLElement;
    const shareText = element.dataset.shareText;
    const targetId = element.dataset.shareTargetId;
    const fileName = element.dataset.shareFilename || "share.png";
    const shareTitle = element.dataset.shareTitle || "Compartir";

    // Image Share Mode
    if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            await shareElementAsImage({
                element: targetEl,
                title: shareTitle,
                text: shareText || "",
                fileName: fileName,
            });
            return;
        } else {
            console.warn(`Share target element with ID '${targetId}' not found.`);
        }
    }

    // Text Share Mode (Fallback or Default)
    if (!shareText) return;

    const fullText = `${shareText}\n\n${window.location.href}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: shareTitle,
                text: fullText,
            });
        } catch (err) {
            console.error("Error sharing:", err);
        }
    } else {
        // Fallback for browsers that don't support Web Share API
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(fullText);
            } else {
                // Fallback for HTTP/Dev environments
                const textArea = document.createElement("textarea");
                textArea.value = fullText;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            // Visual feedback
            const originalContent = element.innerHTML;
            element.innerHTML =
                '<span style="font-size: 0.75em; font-weight: bold; color: #10b981;">¡Copiado!</span>';

            setTimeout(() => {
                element.innerHTML = originalContent;
            }, 2000);
        } catch (err) {
            console.error("Clipboard failed", err);
        }
    }
}

// Auto-initialize if running in the browser
if (typeof window !== "undefined") {
    document.addEventListener("click", handleGlobalShare);
}
