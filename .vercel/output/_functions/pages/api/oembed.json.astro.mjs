import { g as getWidgetHtml } from '../../chunks/widget_kuIE_a58.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url") || "";
  if (!targetUrl || targetUrl === "") {
    return new Response(
      JSON.stringify({
        error: "Missing url parameter"
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  const lowUrl = targetUrl.toLowerCase();
  const allowedDomains = ["jjlmoya.es", "localhost", "127.0.0.1"];
  if (!allowedDomains.some((domain) => lowUrl.includes(domain))) {
    return new Response(
      JSON.stringify({
        error: "Invalid Domain",
        message: "This oEmbed provider only supports jjlmoya.es links",
        received: targetUrl
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  const baseUrl = targetUrl.split("?")[0];
  const widgetUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}?widget=true`;
  const utilityName = baseUrl.split("/").filter(Boolean).pop() || "utilidad";
  const widgetId = `wj-${utilityName}`;
  const cleanUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const embedHtml = getWidgetHtml({ widgetId, widgetUrl, cleanUrl });
  const response = {
    version: "1.0",
    type: "rich",
    provider_name: "jjlmoya",
    provider_url: url.origin,
    author_name: "jjlmoya",
    author_url: url.origin,
    title: `Widget: ${utilityName.replace(/-/g, " ")}`,
    html: embedHtml,
    width: 800,
    height: 500,
    cache_age: 3600
  };
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
