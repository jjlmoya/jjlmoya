export const prerender = true;

import type { APIRoute, GetStaticPaths } from "astro";
import { getAllRegisteredTools, CATEGORIES } from "../../../i18n/toolRegistry";

export const getStaticPaths: GetStaticPaths = async () => {
    const allTools = getAllRegisteredTools();
    const colorByKey = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.color]));
    const paths: Array<{ params: { slug: string }; props: { title: string; description: string; slug: string; color: string } }> = [];

    await Promise.all(
        allTools.map(async ([tool, categoryKey]) => {
            const toolDef = tool as { entry: { i18n: Record<string, () => Promise<{ slug: string; title: string; description: string }>> } };
            const content = await toolDef.entry.i18n.es!();
            paths.push({
                params: { slug: content.slug },
                props: {
                    title: content.title,
                    description: content.description,
                    slug: content.slug,
                    color: colorByKey[categoryKey] ?? "#6366f1",
                },
            });
        })
    );

    return paths;
};

export const GET: APIRoute = ({ props }) => {
    const { title, description, slug, color } = props as { title: string; description: string; slug: string; color: string };

    const startUrl = `/utilidades/${slug}/`;

    const manifest = {
        name: title,
        short_name: title.length > 20
            ? title.split(" ").filter(w => !["de","la","el","los","las","un","una","y","a","en","del"].includes(w.toLowerCase())).map(w => w[0].toUpperCase()).join("")
            : title,
        description,
        start_url: startUrl,
        scope: startUrl,
        icons: [
            {
                src: `/images/utilities/${slug}.webp`,
                sizes: "512x512",
                type: "image/webp",
                purpose: "any",
            },
        ],
        theme_color: color,
        background_color: color,
        display: "standalone",
        orientation: "portrait",
    };

    return new Response(JSON.stringify(manifest, null, 2), {
        headers: { "Content-Type": "application/manifest+json" },
    });
};
