import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://www.jjlmoya.es",
    output: "static",
    adapter: vercel(),
    devToolbar: {
        enabled: false,
    },
    integrations: [icon(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ["date-fns"],
        },
    },
    trailingSlash: "always",
});
