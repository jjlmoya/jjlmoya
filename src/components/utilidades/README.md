# How to Create a New Utility

This guide outlines the standard workflow for adding a new tool to the Utilities section. Our goal is not just function, but **aesthetic excellence**. We do not build MVPs here; we build premium, polished, and "wow" experiences.

## 1. Design Philosophy

- **Aesthetics First**: The UI must look premium. Use glassmorphism, subtle gradients, animations, and clean whitespace.
- **Theme Aware**: Design for both light and dark themes. Prioritize clean, breathable layouts.
- **Styling**: **TAILWIND IS STRICTLY FORBIDDEN**. Every utility MUST have its own dedicated `.css` file imported within the component. All styles must follow SOLID principles, be vanilla CSS, and ideally use BEM or scoped CSS to avoid conflicts.
- **Interactive**: Elements should react to the user. Hover states, transitions, and immediate feedback are mandatory.
- **Visual**: If a result can be visualized (charts, bars, counters), do it. Don't just show a number.
- **Language**: All user-facing text must be in **Spanish**, code in English.
- **No Emojis**: Emojis are strictly forbidden in the codebase and the web content.

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

const faqItems = [
    {
        question: "¿Cómo funciona esto?",
        answer: "Explicación breve y clara que genera Schema JSON-LD automáticamente."
    }
];
---

<LayoutUtility
    title="Título Extendido para SEO"
    description="Descripción corta y atractiva"
    image="/images/utilities/my-tool.webp"
    gradientFrom="from-color-100"
    faqItems={faqItems}
>
    <!-- 1. Header Slot -->
    <div slot="header">
        <UtilityHeader
            titleHighlight="Palabra"
            titleBase="Destacada"
            description="Descripción matadora de 2 líneas."
            gradientFrom="from-color-500"
            gradientTo="to-color-600"
        />
    </div>

    <!-- 2. The Tool -->
    <SuperCalculator />

    <!-- 3. SEO Content Slot -->
    <div slot="seo">
        <SuperCalculatorSEO />
    </div>
</LayoutUtility>
```

### C. The Configuration (`src/data/utilities/`)

You must register the new tool in the appropriate category file. **Categorize correctly** (e.g., text tools in `files.ts`).

## 3. SEO & Content

- **SEO Component**: Do not use Lorem Ipsum. Write valuable content. **MANDATORY**: The text must focus on organic Google ranking using user-centric keywords and key phrases (e.g., "how to resize an image", "download youtube thumbnail"). Do NOT write self-justifying text about the technical architecture, how good the web app is, or that you are a "senior" developer. Focus purely on answering what the user is searching for on Google.
- **Premium Styling**: SEO components MUST have their own `.css`. Use high-end typography, styled lists, and proper spacing. **No manual FAQ lists** in the HTML if using `faqItems` prop.
- **Content Volume**: At least **800 words** of high-quality text.
- **Micro-interactions**: Use CSS transitions on list items and hover effects.
- **Bibliography**: Use the `<Bibliography />` standard component.

## 4. Assets & Images

- **Style**: **"Artist Ink and Watercolor"**.
    - Vibrant ink splashes (matching the utility's color theme).
    - Concept art style, High Quality, 8k.
    - _No 3D realistic renders. No photographs._
    - **Visual Concept Over Text**: The prompt should focus on illustrating the application's concept graphically.
    - **Text**: **Minimize text in images**. Too much text becomes unreadable when scaled down. If any text is included, it MUST be a very short, punchy title in **Spanish** or nothing at all.
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
