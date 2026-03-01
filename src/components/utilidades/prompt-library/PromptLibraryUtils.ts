export function copyToClipboard(text: string, btnElement: HTMLElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        btnElement.classList.add('pl-copied');
        setTimeout(() => {
            btnElement.innerHTML = originalHTML;
            btnElement.classList.remove('pl-copied');
        }, 2000);
    }).catch(err => {
        console.error('Error copying to clipboard:', err);
    });
}
