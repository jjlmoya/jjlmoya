export function getWidgetHtml({
    widgetId,
    widgetUrl,
    cleanUrl,
    theme,
}: {
    widgetId: string;
    widgetUrl: string;
    cleanUrl: string;
    theme?: "light" | "dark";
}) {
    let finalWidgetUrl = widgetUrl;
    const params = new URLSearchParams();
    if (theme) params.append("theme", theme);
    const queryString = params.toString();
    if (queryString) {
        finalWidgetUrl += (finalWidgetUrl.includes("?") ? "&" : "?") + queryString;
    }

    const finalCleanUrl = cleanUrl.endsWith("/") ? cleanUrl : cleanUrl + "/";

    const isDark = theme === "dark";
    const bg = isDark ? "#09090b" : "#fff";
    const border = isDark ? "#27272a" : "#e2e8f0";

    return `<div id="${widgetId}-wrp" style="position: relative; width: 100%; border: 1px solid ${border}; border-radius: 12px; overflow: hidden; background: ${bg};">
    <script>
        (function() {
            var id = '${widgetId}';
            function update(h) {
                var f = document.getElementById(id);
                var l = document.getElementById(id + '-loader');
                if (f && h) f.style.height = h + 'px';
                if (f) f.style.opacity = '1';
                if (l) { l.style.opacity = '0'; setTimeout(function(){ l.style.display = 'none'; }, 400); }
            }
            window.addEventListener('message', function(e) {
                if (e.data && e.data.jjlmoyaId === id && e.data.jjlmoyaHeight) {
                    update(e.data.jjlmoyaHeight);
                }
            });
            window._jjshow = update;
        })();
    ` + '</' + 'script>' + `
    <div id="${widgetId}-loader" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: ${bg}; z-index: 10; transition: opacity 0.4s;">
        <div style="width: 24px; height: 24px; border: 2px solid ${isDark ? "#18181b" : "#f3f4f6"}; border-top-color: #94a3b8; border-radius: 50%; animation: jjspin 0.8s linear infinite;"></div>
    </div>
    <iframe id="${widgetId}" src="${finalWidgetUrl}&id=${widgetId}" width="100%" height="400" frameborder="0" scrolling="no" style="display: block; opacity: 0; transition: opacity 0.4s, height 0.3s ease; border: none;" onload="window._jjshow()"></iframe>
    <style>@keyframes jjspin { to { transform: rotate(360deg); } } #${widgetId}-link:hover { opacity: 1 !important; color: ${isDark ? "#fff" : "#000"} !important; background: ${isDark ? "#18181b" : "#f8fafc"} !important; border-color: ${border} !important; }</style>
</div>
<div style="text-align: center; margin-top: 10px;">
    <a id="${widgetId}-link" href="${finalCleanUrl}" target="_blank" title="Usa esta utilidad en tu web" style="display: inline-flex; align-items: center; gap: 6px; font-size: 9px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #94a3b8; text-decoration: none; padding: 4px 12px; border-radius: 100px; border: 1px solid ${isDark ? "#18181b" : "#f1f5f9"}; background: ${bg}; transition: all 0.2s ease; opacity: 0.8; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        <span style="font-weight: 600; letter-spacing: 0.02em;">jjlmoya.es</span>
    </a>
</div>`;
}
