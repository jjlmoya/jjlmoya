# Guía: Migración de Categorías a Librerías Externas

Esta guía documenta el proceso completo para migrar una categoría con sus tools desde jjlmoya a una librería externa (como `@jjlmoya/utils-pets` o `@jjlmoya/utils-bike`).

## Requisitos Previos

- La librería externa ya está creada
- Los tools están implementados en la librería con estructura estándar
- La librería exporta correctamente desde `src/index.ts` y `src/data.ts`

## Estructura Esperada de la Librería

```
src/
├── index.ts              (exporta todo)
├── data.ts               (exporta datos + tipos)
├── category/
│   ├── index.ts          (petsCategory)
│   ├── seo.astro         (PetsCategorySEO)
│   └── i18n/
│       └── es.ts         (title, description, slug, content)
└── tool/
    ├── tool-one/
    │   ├── index.ts      (export TOOL_ONE_TOOL, components)
    │   ├── component.astro
    │   ├── seo.astro
    │   ├── bibliography.astro
    │   ├── logic.ts
    │   └── i18n/
    │       └── es.ts     (title, description, slug, ui)
    └── tool-two/
        └── ...
```

## Pasos de Migración

### 1. Verificar Exportaciones de la Librería

Asegúrate de que `src/index.ts` y `src/data.ts` exportan:

**data.ts:**
```typescript
export { toolOne, toolTwo } from './tool/...';
export { categoryName } from './category';
export type { ... } from './types';
```

**index.ts:**
```typescript
export * from './tool/toolOne';
export * from './tool/toolTwo';
export { categoryName } from './category';
export { default as CategoryNameSEO } from './category/seo.astro';
```

### 2. Verificar Nombres de Imágenes

Los nombres de las imágenes **DEBEN** coincidir exactamente con los slugs:

- Slug en i18n: `calculadora-edad-mascotas`
- Archivo de imagen: `calculadora-edad-mascotas.webp`
- Ubicación: `public/images/utilities/`

Si los nombres no coinciden, renombra las imágenes ahora:
```bash
mv old-name.webp new-slug-name.webp
```

### 3. Actualizar Datos de Sección (src/data/utilities/[category].ts)

Reemplaza el contenido con:

```typescript
import type { SectionData } from "./types";
import { categoryName, toolOne, toolTwo } from '@jjlmoya/utils-category/data';

const LOCALE = 'es';

const [toolOneContent, toolTwoContent] = await Promise.all([
    toolOne.i18n[LOCALE]!(),
    toolTwo.i18n[LOCALE]!(),
]);

export const categorySection: SectionData = {
    title: "Nombre Categoría",
    slug: "slug-categoria",
    icon: categoryName.icon,
    theme: "color-theme",
    utilities: [
        {
            href: "/utilidades/tool-one-slug/",
            iconBg: toolOne.icons.bg,
            iconFg: toolOne.icons.fg,
            title: toolOneContent.title,
            description: toolOneContent.description,
            color: "#colortheme",
        },
        {
            href: "/utilidades/tool-two-slug/",
            iconBg: toolTwo.icons.bg,
            iconFg: toolTwo.icons.fg,
            title: toolTwoContent.title,
            description: toolTwoContent.description,
            color: "#colortheme",
        },
    ],
};
```

### 4. Actualizar Páginas de Tools (src/pages/utilidades/[slug].astro)

Simplifica cada página a:

```astro
---
export const prerender = true;
import { TOOL_NAME_TOOL as tool } from "@jjlmoya/utils-category";
import LibraryUtilityLayout from "../../components/utilidades/LibraryUtilityLayout.astro";
---

<LibraryUtilityLayout {tool} />
```

**Notas:**
- Reemplaza `TOOL_NAME_TOOL` con el nombre exportado (ej: `PET_AGE_TOOL`)
- Reemplaza `utils-category` con el nombre de la librería
- Una página puede ser tan corta como 8 líneas

### 5. Actualizar Página de Categoría (src/pages/utilidades/categorias/[slug].astro)

Simplifica a:

```astro
---
export const prerender = true;
import LayoutUtilityCategory from "../../../layouts/LayoutUtilityCategory.astro";
import { CategoryNameSEO, categoryName } from "@jjlmoya/utils-category";
import { categorySection } from "../../../data/utilities/category-slug";

const categoryColor = "#themcolor";
const content = await categoryName.i18n.es!();
---

<LayoutUtilityCategory
    title={content.title}
    description={content.description}
    image="/images/utilities/category/category-slug.webp"
    utilities={categorySection.utilities}
    theme={categorySection.theme}
    categoryColor={categoryColor}
    section={categorySection}
>
    <div slot="seo">
        <CategoryNameSEO />
    </div>
</LayoutUtilityCategory>
```

**Importante:**
- El título y descripción VIENEN DE LA LIBRERÍA
- El SEO VIENE DE LA LIBRERÍA
- Solo la estructura del layout es local

### 6. Eliminar Componentes Locales

```bash
rm -rf src/components/utilidades/tool-one-folder
rm -rf src/components/utilidades/tool-two-folder
rm -rf src/components/utilidades/category-folder
```

### 7. Verificar Imports en src/data/utilities/index.ts

Asegúrate de que la sección se importa correctamente:

```typescript
import { categorySection } from "./category-slug";

export const sections: SectionData[] = [
    // ...
    categorySection,
    // ...
];
```

### 8. Ejecutar Tests

Verifica que todo compila y los tests pasan:

```bash
npm test -- tests/category_pages.test.ts tests/utilities_integration.test.ts
npx astro build
```

## Checklist de Migración

- [ ] Librería tiene estructura correcta con `category/` y `tool/`
- [ ] Librería exporta `CategoryNameSEO` desde `index.ts`
- [ ] Librería exporta datos desde `data.ts`
- [ ] Nombres de imágenes coinciden con slugs de i18n
- [ ] Sección de datos actualizada
- [ ] Páginas de tools reducidas a 8 líneas
- [ ] Página de categoría reduce a 30 líneas
- [ ] Componentes locales eliminados
- [ ] Tests pasan
- [ ] Build exitoso sin errores

## Estructura Final en jjlmoya

Después de la migración, solo quedan archivos locales mínimos:

```
src/
├── pages/utilidades/
│   ├── tool-one-slug.astro          (8 líneas, importa de librería)
│   ├── tool-two-slug.astro          (8 líneas, importa de librería)
│   └── categorias/category-slug.astro (30 líneas, importa de librería)
├── data/utilities/
│   └── category-slug.ts             (20 líneas, datos dinámicos)
└── components/utilidades/
    └── LibraryUtilityLayout.astro   (componente genérico, sin cambios)
```

**Total líneas eliminadas por categoría:** 500+ líneas de código, 120+ líneas de SEO, múltiples componentes

## Ventajas de Esta Migración

✅ Código más limpio y mantenible  
✅ Cambios de SEO solo en la librería  
✅ Reutilización de componentes  
✅ Responsabilidades claras (UI en librería, integración en jjlmoya)  
✅ Facilita la creación de nuevas versiones de tools  
✅ Tests centralizados en la librería  

## Troubleshooting

### Error: "Unknown file extension .astro"

El loader de Astro no está registrado. Verifica que `vitest.config.ts` incluye:

```typescript
plugins: [
    {
        name: "astro-stub-loader",
        resolveId(id) { if (id.endsWith(".astro")) return id; },
        load(id) { if (id.endsWith(".astro")) return "export default {};"; },
    },
]
```

### Error: "Property 'ui' is missing"

El tipo de `LibraryUtilityLayout` necesita actualización. Verifica que `Props` incluya:

```typescript
interface Props {
    tool?: { entry: any; Component: any; SEOComponent: any; BibliographyComponent: any };
    ui?: any;
}
```

### Las imágenes no cargan

Verifica que:
1. Nombre de imagen = slug en i18n de la librería
2. Ubicación: `public/images/utilities/[nombre].webp`
3. `LibraryUtilityLayout` usa: `image = content.slug;`

### Tests fallan por imports de librería

Asegúrate de que los mocks de Astro están funcionando y que el archivo `scripts/astro-loader.mjs` existe.
