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

const downloadImage = (canvas: HTMLCanvasElement, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
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

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullShareText);
            alert("No se pudo generar la imagen. El texto se ha copiado al portapapeles.");
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
                console.log("[Share] Starting aggressive oklab/oklch sanitization...");
                const allElements = clonedDoc.querySelectorAll("*");
                const ctx = document.createElement("canvas").getContext("2d");

                // Helper to convert a single color string (e.g. "oklab(...)") to RGB/Hex via Canvas
                const toRgb = (color: string) => {
                    if (!ctx) return "#000000"; // Fallback if no context
                    try {
                        ctx.fillStyle = color;
                        const computed = ctx.fillStyle;
                        // If browser doesn't support oklab/oklch or conversion failed, it might return the input or empty
                        // If it still contains oklab/oklch, force a fallback to avoid crash
                        if (!computed || computed.includes("oklab") || computed.includes("oklch")) {
                            return "#000000"; // Safe fallback
                        }
                        return computed;
                    } catch (e) {
                        return "#000000"; // Safe fallback
                    }
                };

                // Helper to replace all oklab(...)/oklch(...) occurrences in a string
                const sanitizeString = (value: string) => {
                    if (!value || typeof value !== 'string') return value;
                    if (!value.includes("oklab") && !value.includes("oklch")) return value;

                    // Regex to capture oklab(...) or oklch(...) blocks. 
                    return value.replace(/(oklab|oklch)\([^)]+\)/g, (match) => {
                        return toRgb(match);
                    });
                };

                let replacements = 0;

                // 1. Sanitize Computed Styles (Inline Styles)
                allElements.forEach((el) => {
                    const element = el as HTMLElement;
                    const style = clonedDoc.defaultView?.getComputedStyle(element) || window.getComputedStyle(element);

                    const props = [
                        'backgroundColor', 'color', 'borderColor', 'boxShadow', 'backgroundImage',
                        'fill', 'stroke', 'stopColor', 'floodColor', 'lightingColor',
                        'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
                        'outlineColor', 'textDecorationColor', 'columnRuleColor', 'caretColor'
                    ];

                    props.forEach(prop => {
                        // @ts-ignore
                        const val = style[prop];
                        if (val && val !== 'none' && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
                            // Special handling for text color that is oklab/oklch (Accents)
                            // User requested these to be white and bold
                            if (prop === 'color' && (val.includes('oklab') || val.includes('oklch'))) {
                                element.style.color = '#ffffff';
                                element.style.fontWeight = 'bold';
                                replacements++;
                                return;
                            }

                            const safeVal = sanitizeString(val);
                            // @ts-ignore
                            element.style[prop] = safeVal;

                            if (val.includes('oklab') || val.includes('oklch')) {
                                replacements++;
                            }
                        }
                    });

                    // 2. Sanitize SVG Attributes
                    if (element instanceof SVGElement) {
                        const svgAttrs = ['fill', 'stroke', 'stop-color', 'flood-color', 'lighting-color'];
                        svgAttrs.forEach(attr => {
                            const val = element.getAttribute(attr);
                            if (val && (val.includes('oklab') || val.includes('oklch'))) {
                                const safeVal = sanitizeString(val);
                                element.setAttribute(attr, safeVal);
                                replacements++;
                            }
                        });
                    }
                });

                // 3. Sanitize <style> tags content
                const styleTags = clonedDoc.querySelectorAll("style");
                styleTags.forEach(styleTag => {
                    if (styleTag.innerHTML.includes('oklab') || styleTag.innerHTML.includes('oklch')) {
                        styleTag.innerHTML = sanitizeString(styleTag.innerHTML);
                        replacements++;
                    }
                });

                console.log(`[Share] Sanitization finished. Fixed ${replacements} oklab/oklch instances.`);
            },
        });

        // Restore styles
        element.style.transform = originalTransform;
        element.style.transition = originalTransition;
        element.style.opacity = originalOpacity;
        element.style.background = originalBackground; // Restore the original background

        // Convert to blob/file
        canvas.toBlob(async (blob) => {
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
                    } catch (err) {
                        console.error("Image share failed:", err);
                        // Fallback to text share if image share fails (e.g. user cancelled or not supported)
                        // But if user cancelled, maybe we shouldn't force text? 
                        // Let's assume if it failed, we try text or download.
                        // Actually, if share fails, it might be user cancellation. 
                        // Let's try to download the image as a "Plan B" for the user.
                        downloadImage(canvas, fileName);
                    }
                } else {
                    // Fallback: Download image + Copy text (Browser doesn't support file share)
                    downloadImage(canvas, fileName);
                    copyToClipboard();
                }
            } else {
                // Blob generation failed
                console.warn("Blob generation failed, falling back to text share");
                await shareTextOnly();
            }
        }, "image/png");
    } catch (error) {
        console.error("Capture failed:", error);
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
            await navigator.clipboard.writeText(fullText);

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
