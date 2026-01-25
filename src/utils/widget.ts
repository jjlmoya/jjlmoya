export function getWidgetHtml({
    widgetId,
    widgetUrl,
    cleanUrl,
}: {
    widgetId: string;
    widgetUrl: string;
    cleanUrl: string;
}) {
    return `<div id="${widgetId}-wrp" style="position: relative; width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff;">
    <script>
        (function() {
            var id = '${widgetId}';
            function update(h) {
                var f = document.getElementById(id);
                var l = document.getElementById(id + '-loader');
                if (f && h) f.style.height = (h + 20) + 'px';
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
    </script>
    <div id="${widgetId}-loader" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: white; z-index: 10; transition: opacity 0.4s;">
        <div style="width: 24px; height: 24px; border: 2px solid #f3f4f6; border-top-color: #4f46e5; border-radius: 50%; animation: jjspin 0.8s linear infinite;"></div>
    </div>
    <iframe id="${widgetId}" src="${widgetUrl}&id=${widgetId}" width="100%" height="400" frameborder="0" scrolling="no" style="display: block; opacity: 0; transition: opacity 0.4s, height 0.3s ease; border: none;" onload="window._jjshow()"></iframe>
    <style>@keyframes jjspin { to { transform: rotate(360deg); } }</style>
</div>
<p style="font-size: 11px; text-align: center; margin-top: 8px; font-family: sans-serif; color: #94a3b8;">
    Potenciado por <a href="${cleanUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; font-weight: 600;">jjlmoya.es</a>
</p>`;
}
