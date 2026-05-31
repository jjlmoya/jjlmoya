# Restos de Tailwind CSS en src/

## Archivos con clases Tailwind en HTML/JS

### 1. `src/components/gamebob/TermsAndConditions.astro`
~75 clases Tailwind. Usa `flex`, `gap`, `text-gray-*`, `text-white`, `bg-white/5`, `rounded-3xl`, `border-white/10`, `backdrop-blur-sm`, `font-bold`, `tracking-*`, `leading-relaxed`, `space-y-2`, `transition-all`, `duration-300`, `hover:*`, `dark:*`, etc.

### 2. `src/components/pages/home/HomeHero.astro`
~40 clases Tailwind. Usa `text-6xl`/`md:text-9xl`, `font-black`, `tracking-tighter`, `text-slate-900`/`dark:text-white`, `mix-blend-difference`, `gap-*`, `hover:*`, `transition-colors`, `duration-300`, `group-hover:*`, `h-[1px]`, etc.

### 3. `src/components/pages/home/HomeBackground.astro`
~35 clases Tailwind. Usa `bg-slate-50`/`dark:bg-slate-950`, `bg-purple-300/30`, `blur-[120px]`, `mix-blend-multiply`, `top-[-20%]`, `w-[*vw]`, `h-[*vw]`, `rounded-full`, etc.

### 4. `src/lib/utilidades/kitchen-timer/KitchenTimer.ts`
~35 clases via `classList.add/remove`. Usa `text-green-500`, `text-red-600`, `text-orange-500`, `ring-4`, `ring-red-500`, `bg-red-50`, `dark:bg-red-900/20`, `animate-bounce`, `bg-slate-900`/`dark:bg-white`, etc.

### 5. `src/lib/utilidades/kitchen-timer/DockManager.ts`
~30 clases en template literals. Usa `flex`, `items-center`, `gap-2`, `px-3`, `py-2`, `rounded-lg`, `border-slate-200`, `shadow-sm`, `min-w-[*px]`, `max-w-[*px]`, `text-[10px]`, `font-mono`, `tabular-nums`, `truncate`, etc.

### 6. `src/layouts/LayoutUtility.astro`
Clases Tailwind en selectores CSS (`<style is:global>`):
- `.max-w-6xl`, `.max-w-5xl`, `.max-w-4xl`, `.max-w-3xl`, `.max-w-2xl`
- `.sm\:pt-20`, `.pt-12`, `.pt-15`
- `.sticky.top-\[60px\]`
- `[class*="fixed"][class*="-z-10"]`
- `[class*="rounded-"`

Además usa `prose prose-lg dark:prose-invert` en HTML.

---

## CSS con definiciones de clases que coinciden con Tailwind

### 7. `src/pages/conceptos/medicion.css` (línea 636)
```css
.med-transform { transform: var(--tw-transform); }
```
Referencia la variable CSS `--tw-transform` de Tailwind.

### 8. `src/pages/conceptos/biblioteca.css`
Clases definidas manualmente con nombres idénticos a Tailwind:
```css
.hidden { display: none !important; }       /* línea 76 */
.opacity-0 { opacity: 0; }                  /* línea 80 */
```

### 9. `src/styles/global.css` (línea 154)
```css
.sr-only { ... }
```
Definido manualmente con el mismo nombre que la utilidad sr-only de Tailwind.

---

## Resumen

| Prioridad | Archivo | Impacto |
|-----------|---------|---------|
| 🔴 Alta | `gamebob/TermsAndConditions.astro` | ~75 clases, migración completa necesaria |
| 🔴 Alta | `home/HomeHero.astro` | ~40 clases, migración completa necesaria |
| 🔴 Alta | `home/HomeBackground.astro` | ~35 clases, migración completa necesaria |
| 🟡 Media | `kitchen-timer/KitchenTimer.ts` | ~35 clases via classList |
| 🟡 Media | `kitchen-timer/DockManager.ts` | ~30 clases en templates |
| 🟡 Media | `layouts/LayoutUtility.astro` | Clases en selectores CSS + prose |
| 🟢 Baja | `medicion.css` | 1 variable CSS (`--tw-transform`) |
| 🟢 Baja | `biblioteca.css` | 2 clases renombrables (.hidden, .opacity-0) |
| 🟢 Baja | `global.css` | 1 clase renombrable (.sr-only) |
