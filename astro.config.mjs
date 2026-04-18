import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://www.jjlmoya.es",
    output: "server",
    adapter: vercel(),
    devToolbar: {
        enabled: false,
    },
    integrations: [icon(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            watch: {
                ignored: (path) => path.includes('.vercel') || path.includes('/dist/'),
            },
        },
        optimizeDeps: {
            exclude: ["date-fns"],
            include: ["jspdf", "html2canvas"],
        },
    },
    trailingSlash: "always",
});
