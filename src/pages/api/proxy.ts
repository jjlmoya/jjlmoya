import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        const response = await fetch("https://cobalt.tools/api/json", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({
            status: "error",
            text: "Error de servidor al procesar la descarga. Por favor, inténtalo de nuevo."
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
