import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [
        {
            name: "astro-stub-loader",
            resolveId(id) {
                if (id.endsWith(".astro")) {
                    return id;
                }
            },
            load(id) {
                if (id.endsWith(".astro")) {
                    return "export default {};";
                }
            },
        },
    ],
    test: {
        testTimeout: 10000,
        setupFiles: ["./scripts/vitest-setup.ts"],
    },
});
