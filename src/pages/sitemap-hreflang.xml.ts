import type { APIRoute } from "astro";
import { getAllRegisteredTools, buildEsSlugMap } from "../i18n/toolRegistry";
import { getUtilityAlternates, getCategoryAlternates, getStaticPageAlternates, getUtilitiesHubAlternates } from "../i18n/gamebob";

const SITE = "https://www.jjlmoya.es";

function urlEntry(loc: string, alternates: Array<{ lang: string; url: string }>) {
    const xDefault = alternates.find((a) => a.lang === "en")?.url ?? loc;
    const xLinks = [
        `    <xhtml:link rel="alternate" hreflang="es" href="${loc}"/>`,
        ...alternates.map(({ lang, url }) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`,
    ].join("\n");

    return `  <url>\n    <loc>${loc}</loc>\n${xLinks}\n  </url>`;
}

export const GET: APIRoute = async () => {
    const entries: string[] = [];

    for (const [tool, categoryKey] of getAllRegisteredTools()) {
        const toolDef = tool as { entry: any };
        const entry = toolDef.entry;
        if (!entry?.i18n?.es) continue;

        const esContent = await entry.i18n.es();
        const esSlug = esContent?.slug;
        if (!esSlug) continue;

        const loc = `${SITE}/utilidades/${esSlug}/`;
        const alternates = await getUtilityAlternates(toolDef, categoryKey);
        if (alternates.length === 0) continue;

        entries.push(urlEntry(loc, alternates));
    }

    for (const esPageSlug of Object.keys(await buildEsSlugMap())) {
        const alternates = await getCategoryAlternates(esPageSlug);
        if (alternates.length === 0) continue;
        entries.push(urlEntry(`${SITE}/utilidades/categorias/${esPageSlug}/`, alternates));
    }

    const staticPages: Array<[string, string]> = [
        ["/", `${SITE}/`],
        ["/apps", `${SITE}/apps/`],
        ["/widgets", `${SITE}/widgets/`],
    ];
    for (const [esPath, loc] of staticPages) {
        const alternates = getStaticPageAlternates(esPath);
        if (alternates.length === 0) continue;
        entries.push(urlEntry(loc, alternates));
    }

    entries.push(urlEntry(`${SITE}/utilidades/`, getUtilitiesHubAlternates()));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
};
