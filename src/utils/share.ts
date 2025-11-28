/**
 * Handles the share functionality for any element with the `data-share-btn` attribute.
 * Expects the element to have a `data-share-text` attribute with the content to share.
 * Appends the current URL to the shared text.
 */
export async function handleGlobalShare(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const btn = target.closest("[data-share-btn]");

    // If the click is not on a share button, ignore it
    if (!btn) return;

    const shareText = (btn as HTMLElement).dataset.shareText;

    // If there is no text to share, ignore it
    if (!shareText) return;

    const fullText = `${shareText}\n\n${window.location.href}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "Compartir",
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
            const originalContent = btn.innerHTML;
            btn.innerHTML =
                '<span style="font-size: 0.75em; font-weight: bold; color: #10b981;">¡Copiado!</span>';

            setTimeout(() => {
                btn.innerHTML = originalContent;
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
