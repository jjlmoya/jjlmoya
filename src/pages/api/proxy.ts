import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const response = await fetch("https://cobalt-api.ayo.tf/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            body: JSON.stringify(body)
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            const text = await response.text();
            console.error("Cobalt non-JSON response:", text);
            return new Response(JSON.stringify({
                status: "error",
                text: "El servicio de descarga ha devuelto una respuesta inesperada."
            }), {
                status: 502,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (error: any) {
        console.error("Proxy error:", error);
        return new Response(JSON.stringify({
            status: "error",
            text: "Error de conexión con el servidor de descarga."
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
