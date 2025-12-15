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
    document.body.appendChild(link);
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

                const textArea = document.createElement("textarea");
                textArea.value = fullShareText;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                document.execCommand("copy");
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

        const originalTransform = element.style.transform;
        const originalTransition = element.style.transition;
        const originalOpacity = element.style.opacity;
        const originalBackground = element.style.background;

        element.style.transform = "none";
        element.style.transition = "none";
        element.style.opacity = "1";

        element.style.background = "radial-gradient(circle at center, #292524 0%, #0c0a09 100%)";


        const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            ignoreElements: (element) => {

                return element.classList.contains("ignore-capture");
            },
            onclone: (clonedDoc) => {
                try {
                    console.log("[Share] Starting aggressive oklab/oklch sanitization...");









                    let replacements = 0;


                    const styleTags = clonedDoc.querySelectorAll("style");
                    styleTags.forEach((styleTag) => {
                        if (
                            styleTag.innerHTML.includes("oklab") ||
                            styleTag.innerHTML.includes("oklch")
                        ) {

                            const newCss = styleTag.innerHTML.replace(
                                /(oklab|oklch)\([^)]+\)/g,
                                "#000000"
                            );
                            styleTag.innerHTML = newCss;
                            replacements++;
                        }
                    });


                    const allElements = clonedDoc.querySelectorAll("*");
                    allElements.forEach((el) => {
                        const element = el as HTMLElement;

                        const props = [
                            "color",
                            "backgroundColor",
                            "borderColor",
                            "boxShadow",
                            "background",
                            "backgroundImage",
                            "borderTopColor",
                            "borderRightColor",
                            "borderBottomColor",
                            "borderLeftColor",
                            "outlineColor",
                            "textDecorationColor",
                            "fill",
                            "stroke",
                        ];

                        const style = window.getComputedStyle(element);

                        props.forEach((prop) => {

                            const val = style[prop as any];
                            if (val && (val.includes("oklab") || val.includes("oklch"))) {

                                let safeVal = "#000000";
                                if (prop === "color") safeVal = "#ffffff";
                                if (prop.includes("background")) safeVal = "rgba(0,0,0,0)";


                                if (prop === "color") {
                                    element.style.color = "#e7e5e4";
                                } else if (prop === "backgroundColor") {

                                    element.style.backgroundColor = "#0c0a09";
                                } else {

                                    (element.style as any)[prop] = safeVal;
                                }
                                replacements++;
                            }
                        });


                        if (element instanceof SVGElement) {
                            const svgAttrs = ["fill", "stroke"];
                            svgAttrs.forEach((attr) => {
                                const val = element.getAttribute(attr);
                                if (val && (val.includes("oklab") || val.includes("oklch"))) {
                                    element.setAttribute(attr, "#3f1d1d");
                                    replacements++;
                                }
                            });
                        }
                    });

                    console.log(
                        `[Share] Sanitization finished. Replaced ~${replacements} instances.`
                    );
                } catch (e) {
                    console.error("Sanitization error:", e);
                }
            },
        });


        element.style.transform = originalTransform;
        element.style.transition = originalTransition;
        element.style.opacity = originalOpacity;
        element.style.background = originalBackground;




        const dataUrl = canvas.toDataURL("image/png");


        const byteString = atob(dataUrl.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: "image/png" });

        if (blob) {
            const file = new File([blob], fileName, { type: "image/png" });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {


                    console.log("[Share] Creating text backup in clipboard...");
                    await copyToClipboard(fullShareText);

                    if ((window as any).toast) {
                        (window as any).toast.show(
                            "Texto copiado. Pégalo al compartir.",
                            "success"
                        );
                    }

                    console.log(
                        `DEBUG: Intentando compartir.\nTexto: ${fullShareText}\nURL: ${url}`
                    );


                    const isIOS =
                        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

                    const shareData: any = {
                        files: [file],
                    };

                    if (isIOS) {


                        console.log("[Share] iOS detected. Sharing file only.");
                    } else {


                        shareData.text = fullShareText;
                        shareData.title = title;
                    }

                    await navigator.share(shareData);
                    onSuccess?.();
                } catch (err: any) {
                    console.error("[Share] Image share failed:", err);

                    if (err.name === "AbortError") {
                        console.log("[Share] User cancelled share.");
                        return;
                    }

                    console.log("[Share] Falling back to download due to error.");
                    downloadBlob(blob, fileName);
                }
            } else {
                console.log(
                    "[Share] Navigator.share not supported or file sharing not allowed (Likely due to HTTP/Insecure Context)."
                );



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

            console.warn("Blob generation failed, falling back to text share");
            await shareTextOnly();
        }
    } catch (error: any) {
        console.error("Capture failed:", error);




        await shareTextOnly();
    }
};


export async function handleGlobalShare(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const btn = target.closest("[data-share-btn]");


    if (!btn) return;

    const element = btn as HTMLElement;
    const shareText = element.dataset.shareText;
    const targetId = element.dataset.shareTargetId;
    const fileName = element.dataset.shareFilename || "share.png";
    const shareTitle = element.dataset.shareTitle || "Compartir";


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


    if (!shareText) return;

    const fullText = `${shareText}\n\n${window.location.href}`;


    const tryShare = async () => {

        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: fullText,
                });
                return true;
            } catch (err) {

                if ((err as Error).name === "AbortError") return true;
                console.warn("Native share failed, falling back to clipboard:", err);
            }
        }


        return await copyToClipboard();
    };

    const copyToClipboard = async () => {
        try {

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isSecure = window.isSecureContext;

            if (isMobile && !isSecure) {
                if ((window as any).toast) {
                    (window as any).toast.show(
                        "⚠️ Compartir requiere HTTPS. Copiado al portapapeles.",
                        "warning"
                    );
                }
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(fullText);
            } else {
                throw new Error("Clipboard API unavailable");
            }

            showCopiedFeedback();
            return true;
        } catch (err) {
            console.warn("Clipboard API failed, trying execCommand fallback:", err);
            return fallbackCopyTextToClipboard(fullText);
        }
    };

    const fallbackCopyTextToClipboard = (text: string) => {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;


            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();


            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);

            if (successful) {
                showCopiedFeedback();
                return true;
            } else {
                console.error("execCommand copy failed");
                return false;
            }
        } catch (err) {
            console.error("Fallback copy failed:", err);
            return false;
        }
    };

    const showCopiedFeedback = () => {

        const originalContent = element.innerHTML;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isSecure = window.isSecureContext;

        if (!isMobile || isSecure) {
            element.innerHTML =
                '<span style="font-size: 0.75em; font-weight: bold; color: #10b981;">¡Copiado!</span>';

            setTimeout(() => {
                element.innerHTML = originalContent;
            }, 2000);
        }
    };

    await tryShare();
}


if (typeof window !== "undefined") {
    document.addEventListener("click", handleGlobalShare);
}
