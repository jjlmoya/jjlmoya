import { getSearchIndex } from "../../lib/search/SearchIndex";

export async function GET() {
    const items = getSearchIndex();
    return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
