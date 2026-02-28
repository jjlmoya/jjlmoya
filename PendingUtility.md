Actúa como un desarrollador experto en Astro y Vanilla CSS para crear utilidades premium en este proyecto. Sigue este proceso sin excepciones:

Identificación y Categorización: Consulta 

PendingUtility.md
 para la siguiente tarea. Antes de registrarla, revisa 

src/data/utilities/index.ts
 para identificar el archivo de datos correcto (ej: herramientas de texto van en 

files.ts
).
Arquitectura 'Separadita':
Crea una carpeta en src/components/utilidades/[NombreIngles]/.
[NombreIngles].astro: Lógica pura client-side (sin comentarios de código).
[NombreIngles].css: Estilos premium (glassmorphism, transiciones, ...).
[NombreIngles]SEO.astro: Contenido SEO de 800+ palabras en español. **MANDATORIO: El texto debe centrarse en posicionamiento orgánico en Google usando palabras y frases clave (ej: "descargar miniatura de youtube", "cómo sacar la portada", etc.) orientadas al usuario final. NO escribas un texto auto-justificativo sobre la arquitectura técnica, lo buena que es la web, que no tiene anuncios o lo "senior" que es.**
[NombreIngles]SEO.css: Estilos premium para el SEO (tipografía Inter, cajas de código elegantes, sin texto 'tirado').
Infraestructura de Sitio:
Crea la página en src/pages/utilidades/[nombre-en-castellano].astro.
Usa el componente LayoutUtility.
MANDATORIO: Pasa las preguntas frecuentes a través de la propiedad faqItems del layout para generar el Schema JSON-LD automático. No crees listas de FAQ manuales en el HTML del SEO.
MANDATORIO: Pon `export const prerender = true;` siempre al inicio del frontmatter de la página de la utilidad, antes de cualquier import.
Calidad Visual e Imágenes:
Genera una imagen SEO con el prompt: 'Artist Ink and Watercolor style, vibrant ink splashes, concept art style, High Quality, 8k. [Concepto visual de la herramienta, NO usar texto ni descripciones largas, solo la idea gráfica]. Vibrant colors. Minimalist short Spanish text: [TITULO CORTO]'.
Convierte la imagen a `.webp` usando el script genérico que tenemos preparado (no la conviertas creando scripts on-the-fly):
```bash
node scripts/convert-image-to-webp.mjs <ruta_imagen_original.png> public/images/utilities/<nombre-herramienta>.webp
```
Validación Técnica:
Cero Comentarios: No incluyas comentarios de rutas ni notas en los archivos finales.
TypeScript Estricto: Evita el tipo any y maneja posibles nulos en el DOM.
Finalización: Ejecuta npm run lint; npm run check; npm run test antes de considerar la tarea terminada. En PowerShell, separa los comandos con ;.



# Utilidades Pendientes (Inspiradas en WebUtility.io)

## 📷 Audiovisual y Diseño Creativo (`audiovisual.ts` / `creative.ts`)
- [x] **Extractor de Thumbnails de YouTube en HD:** Introduciendo un ID o Enlace de YouTube te saca la miniatura principal a máxima calidad (manipulación de cadena de URL).
- [x] **Convertidor de Imagen a SVG / Data URI / ASCII:** Convertidores de formato altamente valorados para perfiles técnicos.
- [ ] **Creador Rápido de Collage de Fotos / Añadir Logo y Bordes:** Herramientas orientadas a usuarios promedio que necesitan retocar imágenes sin instalar programas, haciéndose todo en el navegador.

## ⚙️ Archivos y Herramientas Varias (`files.ts` / `tools.ts` / `utilities`)

- [x] **Enlace de Descarga Directa para Google Drive:** Convierte el link de "compartir" en un ID que descarga instantáneamente sin abrir el visor de Drive.
- [ ] **Generador de Enlaces para WhatsApp:** Formulario sencillo (Número + Mensaje) para conseguir el enlace corto `wa.me/...` .
- [ ] **Convertidor de URL a Código QR (e Imagen a QR):** Generador rápido, seguro, limpio de publicidad, usando una librería en el cliente para pintar el SVG/Canvas.

## 📋 Textos, Oficina y Productividad (`tools.ts`)

- [ ] **Generador Gratis de Facturas en PDF:** Un mini constructor de documento financiero descargable a PDF en local usando `html2pdf.js` o similar.
- [ ] **Generador de Enlaces y Contraseñas MD5 con Salt:** Herramienta simple de hashing usando Web Crypto API.
- [ ] **Eliminador de Emojis / Espacios Dobles:** Micro utilidades de texto enfocadas a la de-saturación de textos.
- [ ] **Separador de Texto (Split):** Corta listas largas o coma-separadas a renglones, un paso tedioso al manipular datos sucios.
- [ ] **Calculadora de Ancho de Píxel de un Texto:** Cálculo visual mediante Canvas de cuánto ancho ocupa una tipografía para truncar texto.

## 🎲 Randomizers y Relax (Encajable en mini-adventures, juegos u otros)

- [ ] **Lanzadores de Dados (DnD / d20):** Ideal para una mini app web de juegos de rol de mesa.

> NOTA: Todas las sugerencias en esta lista son 100% Client-Side y no requieren ningún fetch externo bloqueado por CORS. Funcionan usando manipulación de texto pura y Web APIs modernas del navegador como Canvas y Web Crypto.
