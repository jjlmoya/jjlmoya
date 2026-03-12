import type { SectionData } from "./types";

export const devSection: SectionData = {
    title: "Desarrollo Web",
    icon: "mdi:code-tags",
    theme: "indigo",
    utilities: [
        {
            href: "/utilidades/convertidor-svg-css/",
            iconBg: "mdi:svg",
            iconFg: "mdi:code-braces",
            title: "Convertidor SVG a CSS",
            description:
                "Transforma tus iconos vectoriales en código CSS optimizado (Background o Mask) para mejorar el rendimiento y la personalización de tu web.",
            color: "#ec4899",
        },
        {
            href: "/utilidades/calculadora-aspect-ratio/",
            iconBg: "mdi:aspect-ratio",
            iconFg: "mdi:ruler-square",
            title: "Calculadora Aspect Ratio",
            description:
                "Calcula nuevas resoluciones de imágenes web y mantén proporciones perfectas en tus assets (16:9, 4:3, cuadrados...). Diseñado para proteger tus diseños UI.",
            color: "#0ea5e9",
        },
        {
            href: "/utilidades/generador-imagenes-placeholder/",
            iconBg: "mdi:image-outline",
            iconFg: "mdi:pencil-ruler",
            title: "Generador Placeholder",
            description:
                "Crea imágenes de prueba o bocetos con dimensiones y textos a medida al instante.",
            color: "#eab308",
        },
        {
            href: "/utilidades/codificador-decodificador-url/",
            iconBg: "mdi:link-variant",
            iconFg: "mdi:code-json",
            title: "URL Encoder & Decoder",
            description:
                "Codifica caracteres especiales a un formato de web segura (Percent-Encoding) o decodifica rutas enrevesadas a texto legible para los humanos al vuelo.",
            color: "#f59e0b",
        },
        {
            href: "/utilidades/eliminador-css-duplicado/",
            iconBg: "mdi:file-document-multiple-outline",
            iconFg: "mdi:auto-fix",
            title: "Limpiador CSS Duplicado",
            description:
                "Analiza, unifica y purga todo tu código CSS redundante y repetido respetando reglas de cascada para optimizar tus hojas de estilo y ahorrar KBs al instante.",
            color: "#10b981",
        },
        {
            href: "/utilidades/convertidor-css-inline/",
            iconBg: "mdi:language-html5",
            iconFg: "mdi:format-paint",
            title: "CSS Inliner Pura",
            description:
                "Transforma tu HTML de diseño bruto fusionando todas tus reglas de hojas de estilos externas y clases estáticas en HTML inyectado en línea (Email Safe).",
            color: "#ec4899",
        },
        {
            href: "/utilidades/calculadora-especificidad-css/",
            iconBg: "mdi:language-css3",
            iconFg: "mdi:scale-balance",
            title: "Especificidad CSS",
            description:
                "Analiza el peso y la cascada de tus selectores CSS visualmente para evitar guerras de estilos.",
            color: "#e11d48",
        },
        {
            href: "/utilidades/cron/",
            iconBg: "mdi:clock-check",
            iconFg: "mdi:calendar-clock",
            title: "Generador de Cron",
            description: "Crea y traduce expresiones cron a lenguaje humano de forma visual.",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/json-formatter/",
            iconBg: "mdi:code-json",
            iconFg: "mdi:code-braces",
            title: "JSON Formatter",
            description: "Valida, repara y formatea JSON. Detección de errores en tiempo real.",
            color: "#d946ef",
        },
        {
            href: "/utilidades/keycode/",
            iconBg: "mdi:keyboard",
            iconFg: "mdi:keyboard-variant",
            title: "KeyCode Visualizer",
            description: "Visualiza códigos de teclas JavaScript en tiempo real.",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/calculadora-coste-llm/",
            iconBg: "mdi:robot",
            iconFg: "mdi:currency-usd",
            title: "Calculadora Costes LLM",
            description: "Estima el precio de tus proyectos con GPT-4, Claude y Gemini.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/tipografia-musical/",
            iconBg: "mdi:music-note",
            iconFg: "mdi:format-size",
            title: "Tipografía Musical",
            description:
                "Calculadora de escalas modulares armónicas para jerarquías tipográficas perfectas.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/generador-mockups-movil/",
            iconBg: "mdi:cellphone-screenshot",
            iconFg: "mdi:image-frame",
            title: "Generador Mockups Móviles",
            description:
                "Crea mockups profesionales de capturas para iPhone y Pixel con fondos personalizados.",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/generador-hashes-seguridad/",
            iconBg: "mdi:security",
            iconFg: "mdi:lock-outline",
            title: "Generador de Hashes",
            description:
                "Calcula potentes sumas de comprobación MD5, SHA-256 y SHA-512 al vuelo. Privacidad total con procesamiento nativo de seguridad en tu navegador.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/biblioteca-prompts/",
            iconBg: "mdi:robot",
            iconFg: "mdi:text-box-search",
            title: "Biblioteca de Prompts",
            description:
                "Guarda, organiza y etiqueta tus instrucciones favoritas de inteligencia artificial en un solo lugar. 100% privado en tu navegador.",
            color: "#a855f7",
        },
        {
            href: "/utilidades/conversor-color-rgb-hex-hsl/",
            iconBg: "mdi:palette",
            iconFg: "mdi:format-color-fill",
            title: "Conversor RGB, HEX & HSL",
            description:
                "Transforma colores entre formatos web con precisión matemática. Genera armonías automáticas y analiza el contraste de accesibilidad WCAG.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/calculadora-legibilidad-visual-wcag-apca/",
            iconBg: "mdi:eye-check",
            iconFg: "mdi:contrast-circle",
            title: "Legibilidad Visual (WCAG vs APCA)",
            description:
                "Analiza el contraste real y la legibilidad según el grosor de fuente y colores. Compara WCAG 2.1 con el nuevo estándar perceptual APCA.",
            color: "#0ea5e9",
        },
        {
            href: "/utilidades/saneador-svg/",
            iconBg: "mdi:svg",
            iconFg: "mdi:auto-fix",
            title: "Saneador de SVG",
            description:
                "Pega código SVG sucio de Figma o un inspector y obtén un SVG optimizado: sin metadatos, sin atributos de editor y con clases CSS limpias.",
            color: "#8b5cf6",
        },
        {
            href: "/utilidades/generador-utm/",
            iconBg: "mdi:link-plus",
            iconFg: "mdi:chart-bar",
            title: "Generador de UTM",
            description: "Crea enlaces de seguimiento para tus campañas de marketing y mide el éxito de tu tráfico.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/limpiador-tracking-url/",
            iconBg: "mdi:broom",
            iconFg: "mdi:link-variant-off",
            title: "Limpiador de Tracking URL",
            description: "Elimina UTMs, fbclid, gclid y otros rastreadores de tus enlaces.",
            color: "#3b82f6",
        },
        {
            href: "/utilidades/inspector-certificados-ssl/",
            iconBg: "mdi:security-network",
            iconFg: "mdi:certificate",
            title: "Inspector de Certificados SSL",
            description:
                "Analiza archivos .pem y .crt localmente para extraer fechas, emisores y huellas digitales. Privacidad total: el certificado nunca sale de tu equipo.",
            color: "#14b8a6",
        },
        {
            href: "/utilidades/generador-security-txt/",
            iconBg: "mdi:security",
            iconFg: "mdi:text-box-outline",
            title: "Generador de Security.txt",
            description:
                "Crea tu archivo security.txt según el estándar RFC 9116 para facilitar el contacto con investigadores de seguridad y proteger tu sitio web.",
            color: "#6366f1",
        },
        {
            href: "/utilidades/calculadora-tiempo-datos/",
            iconBg: "mdi:clock-time-four",
            iconFg: "mdi:speedometer",
            title: "Calculadora de Tiempo en Datos",
            description:
                "Descubre cuánto tiempo pierden tus usuarios esperando Instagram, YouTube, TikTok y otras apps. Visualiza el impacto real: horas, días, años de vida perdidos en cargas.",
            color: "#2563EB",
        },
        {
            href: "/utilidades/conversor-excel-csv-a-tabla-html/",
            iconBg: "mdi:file-excel",
            iconFg: "mdi:language-html5",
            title: "Excel/CSV a Tabla HTML",
            description: "Transforma tus hojas de cálculo y archivos CSV en tablas HTML semánticas y limpias para tu web.",
            color: "#10b981",
        },
    ],
};
