import type { APIRoute } from "astro";
import { getWidgetHtml } from "../../utils/widget";

export const GET: APIRoute = ({ url }) => {
    const targetUrl = url.searchParams.get("url");
    const format = url.searchParams.get("format") || "json";

    if (!targetUrl || !targetUrl.includes("/utilidades/")) {
        return new Response(JSON.stringify({ error: "Invalid URL" }), { status: 400 });
    }

    const baseUrl = targetUrl.split("?")[0];
    const widgetUrl = `${baseUrl}${baseUrl.endsWith("/") ? "" : "/"}?widget=true`;
    const utilityName = baseUrl.split("/").filter(Boolean).pop() || "utilidad";
    const widgetId = `jjlmoya-widget-${utilityName}`;
    const cleanUrl = baseUrl;

    const embedHtml = getWidgetHtml({ widgetId, widgetUrl, cleanUrl });

    const response = {
        version: "1.0",
        type: "rich",
        provider_name: "jjlmoya",
        provider_url: "https://jjlmoya.es",
        author_name: "jjlmoya",
        author_url: "https://jjlmoya.es",
        title: `Herramienta Interactiva: ${utilityName}`,
        html: embedHtml,
        width: 800,
        height: 500,
        cache_age: 3600,
    };

    return new Response(JSON.stringify(response), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
};
