import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";


export default defineConfig({
    site: "https://www.jjlmoya.es",
    integrations: [icon(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: ["date-fns"],
        },
    },
    trailingSlash: "always",
});
