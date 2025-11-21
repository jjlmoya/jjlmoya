/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            spacing: {
                sm: "var(--spacing-sm)",
                md: "var(--spacing-md)",
                lg: "var(--spacing-lg)",
                xl: "var(--spacing-xl)",
            },
            colors: {
                "primary-light": "var(--color-primary-light)",
                "primary-dark": "var(--color-primary-dark)",
                "bg-light": "var(--color-bg-light)",
                "bg-dark": "var(--color-bg-dark)",
                "gamebob-primary": "var(--color-gamebob-primary)",
                "gamebob-text": "var(--color-gamebob-text)",
                "gamebob-bg": "var(--color-gamebob-bg)",
                accent: "var(--color-accent)",
                text: "var(--color-text)",
                bg: "var(--color-bg)",
            },
        },
    },
    plugins: [],
};
