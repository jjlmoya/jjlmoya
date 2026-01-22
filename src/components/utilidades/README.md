# How to Create a New Utility

This guide outlines the standard workflow for adding a new tool to the Utilities section. Our goal is not just function, but **aesthetic excellence**. We do not build MVPs here; we build premium, polished, and "wow" experiences.

## 1. Design Philosophy

- **Aesthetics First**: The UI must look premium. Use glassmorphism, subtle gradients (`emerald`, `indigo`, `blue`), animations, and clean whitespace.
- **Theme Aware**: Do NOT design exclusively for dark mode. Use Tailwind's `dark:` classes to ensure the utility looks spectacular in both light and dark themes. Prioritize clean, breathable layouts.
- **Interactive**: Elements should react to the user. Hover states, transitions, and immediate feedback are mandatory.
- **Visual**: If a result can be visualized (charts, bars, counters), do it. Don't just show a number.
- **Language**: All user-facing text must be in **Spanish**.

## 2. File Structure

For a hypothetical utility named `super-calculator`:

### A. The Components (`src/components/utilidades/ingredient-rescaler/`)

Create a folder for your utility.

- **Naming Convention**: The folder name must be in **English** (kebab-case). Example: `ingredient-rescaler`.
- _Note_: The route (url) will be in Spanish (e.g., `reescalador-ingredientes.astro`), but the component source code stays in English.

It must contain at least two files:

1.  **`SuperCalculator.astro`**: The main functional component. Contains the UI and the logic `<script>`.
2.  **`SuperCalculatorSEO.astro`**: A semantic HTML section that appears _below_ the tool. It should explain the concepts, math, or methodology in depth for SEO purposes.

### B. The Page (`src/pages/utilidades/super-calculator.astro`)

This is the entry point. It must use **`LayoutUtility`**.

```astro
---
import LayoutUtility from "../../layouts/LayoutUtility.astro";
import UtilityHeader from "../../components/utilidades/UtilityHeader.astro";
import SuperCalculator from "../../components/utilidades/super-calculator/SuperCalculator.astro";
import SuperCalculatorSEO from "../../components/utilidades/super-calculator/SuperCalculatorSEO.astro";
---

<LayoutUtility
    title="Extended Title for SEO"
    description="Short description"
    image="/images/utilities/my-tool.webp"
    gradientFrom="from-color-100"
>
    <!-- 1. Header Slot using Standard Component -->
    <div slot="header">
        <UtilityHeader
            titleHighlight="Highlight World"
            titleBase="Base Word"
            description="Punchy, 2-line description that sits under the title."
            gradientFrom="from-color-500"
            gradientTo="to-color-600"
            reverse={false}
            <!--
            Optional:
            swaps
            order
            of
            highlight
            base
            --
        >
            />
        </UtilityHeader>

        <!-- 2. The Tool -->
        <SuperCalculator />

        <!-- 3. SEO Content Slot -->
        <div slot="seo">
            <SuperCalculatorSEO />
        </div>
    </div></LayoutUtility
>
```

### C. The Configuration (`src/data/utilities/`)

You must register the new tool in the appropriate category file (e.g., `files.ts`, `finance.ts`, `tools.ts`).

```typescript
{
    href: "/utilidades/super-calculator/",
    iconBg: "mdi:calculator", // Use Iconify IDs
    iconFg: "mdi:number",
    title: "Super Calculator",
    description: "Short, punchy description.",
    color: "#COLOR_HEX"
}
```

## 3. SEO & Content

- **SEO Component**: Do not use Lorem Ipsum. Write valuable content. Explain "How to use", "Why this matters", or "The Math behind it".
- **Content Volume**: The SEO component must contain at least **800 words** of high-quality, relevant text.
- **Search Intent**: Use titles and text that people actually search for on Google. Research keywords and include common questions (H2, H3) that users ask about the topic.
- **Meta Tags**: Ensure the title is click-worthy (e.g., "Calculadora de IVA Inverso" es mejor que "IVA").
- **Bibliography & Sources**:
    - **Standard Component**: You MUST use the `<Bibliography />` standard component in the `bibliography` slot of `LayoutUtility`.
    - **Scientific Value**: Don't just link to Wikipedia. Use the one that you use. Prioritize high-value, scientific sources (Research papers, academic journals, official documentation from NIST, IEEE, etc.). (in your life and in your code please)
    - **Traceability**: Explicitly show where the formulas, logic, or data used in the tool were extracted from. "Compartir es vivir".

## 4. Assets & Images

- **Style**: **"Artist Ink and Watercolor"**.
    - Vibrant ink splashes (matching the utility's color theme).
    - Concept art style, High Quality, 8k.
    - _No 3D realistic renders. No photographs._
    - **Text**: If the image contains text, it MUST be in **Spanish**.
- **Format**: `.webp` (due to local conversion limitations, prefer webp for others).
- **Location**: `public/images/utilities/`.

## 5. Development Checklist

- [ ] Logic works completely offline (client-side JS).
- [ ] "Wow" factor achieved (animations, gradients).
- [ ] **Uses `LayoutUtility` and `UtilityHeader` components.**
- [ ] SEO Component written in rich Spanish.
- [ ] Added to `src/data/utilities`.
- [ ] OG Image added and linked.
- [ ] Mobile responsive (test on small viewport).
