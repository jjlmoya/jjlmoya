
export default {
    content: ["./src*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
                "gamebob-teal-dark": "var(--color-gamebob-teal-dark)",
                "split-light": "var(--color-split-light)",
                "split-dark": "var(--color-split-dark)",

                
                "p-text": "var(--color-p-text)",
                "p-text-muted": "var(--color-p-text-muted)",
                "p-bg-card": "var(--color-p-bg-card)",
                "p-accent-1": "var(--color-p-accent-1)",
                "p-accent-2": "var(--color-p-accent-2)",
                "p-accent-3": "var(--color-p-accent-3)",
                "p-accent-4": "var(--color-p-accent-4)",
                "p-accent-5": "var(--color-p-accent-5)",
                "p-accent-6": "var(--color-p-accent-6)",
                "p-accent-7": "var(--color-p-accent-7)",
                "p-accent-8": "var(--color-p-accent-8)",
                "p-accent-9": "var(--color-p-accent-9)",
                "p-accent-10": "var(--color-p-accent-10)",
                "p-accent-11": "var(--color-p-accent-11)",
                "p-accent-12": "var(--color-p-accent-12)",

                accent: "var(--color-accent)",
                text: "var(--color-text)",
                bg: "var(--color-bg)",
            },
        },
    },
    plugins: [],
};
