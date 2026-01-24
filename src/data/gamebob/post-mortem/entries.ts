export interface PostMortemEntry {
    id: string;
    title: string;
    date: string;
    error: string;
    lesson: string;
    tags?: string[];
    image?: string;
    codeSteps?: {
        title: string;
        code: string[];
    }[];
}

export const postMortemEntries: PostMortemEntry[] = [
    {
        id: "debug-por-url",
        title: "La Trampa de las SPA: El Debug por URL",
        date: "2025-12-26",
        image: "spa-url-debug.webp",
        error: "Diseñar aplicaciones híbridas (Capacitor, WebView) como Single Page Applications (SPA) puras, donde el estado vive solo en memoria y no tiene reflejo en la URL, es un error crítico. Al delegar todo el estado a variables internas, pierdes la capacidad de debuggear el 'webview' directamente saltando a pantallas específicas o compartir un estado concreto con un bug report desde el dispositivo real.",
        lesson: "En el desarrollo de apps híbridas, la URL debe ser la fuente de verdad del estado visual. Implementar 'Deep Linking' mediante query parameters transforma la DX: añadir `?state=broken&msg=42` permite testear flujos complejos en el dispositivo sin navegación manual y facilita enormemente la generación de screenshots para las stores (Google Play/App Store) usando scripts de automatización. El coste de la recarga se mitiga con frameworks, pero la visibilidad del estado en la URL es vital para la observabilidad en apps que corren dentro de wrappers.",
        tags: ["state-management", "debugging", "dx", "deep-linking"],
    },
    {
        id: "ia-vaga-linter",
        title: "El Junior Brillante (y Peligrosamente Vago)",
        date: "2025-12-26",
        image: "ia-vaga-linter.webp",
        error: "Confiar ciegamente en una IA es el camino más rápido hacia la entropía técnica. Por mucho que las limites con archivos `.md` o instrucciones en el sistema, su naturaleza probabilística las lleva a ignorar restricciones, inyectar emojis innecesarios y romper la arquitectura SOLID en favor de la 'solución rápida'. El drama no es que la IA falle, sino que el desarrollador pierda el control sobre su propio estándar de calidad.",
        lesson: "La única forma de mantener la cordura es tratar a la IA como un perfil junior extremadamente productivo pero sin criterio: si no hay una barrera técnica, se la saltará. La redención llegó al blindar el repositorio con linters agresivos y un flujo de trabajo innegociable. No basta con pedir orden; hay que forzarlo mediante scripts que impidan el commit si el código tiene comentarios, emojis o funciones que superen las 50 líneas. Este enfoque obliga a la IA a realizar separaciones de responsabilidad y abstracciones reales para cumplir con los checks. Pero ojo: la IA es astuta y, cuando se ve acorralada por las reglas, intentará mutar el linter o sugerirte un `--no-verify`. Si le dejas esa puerta abierta, el sistema colapsará. La vigilancia del desarrollador senior sobre los cimientos técnicos es lo único que nos separa del caos.",
        tags: ["ai-pair-programming", "linting", "husky", "software-quality"],
        codeSteps: [
            {
                title: "1. Reglas de Acero (ESLint Configuration)",
                code: [
                    "export default [",
                    "  {",
                    "    files: ['src/**/*.{ts,js,astro}'],",
                    "    rules: {",
                    "      'no-comments/disallow': 'error',",
                    "      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],",
                    "      'max-lines': ['error', { max: 200, skipBlankLines: true }],",
                    "      'complexity': ['error', 10],",
                    "      'no-restricted-syntax': [",
                    "        'error',",
                    "        {",
                    "          selector: 'Literal[value=/\\\\p{Emoji}/u]',",
                    "          message: 'Emojis are strictly forbidden in the codebase.'",
                    "        }",
                    "      ]",
                    "    }",
                    "  }",
                    "];",
                ],
            },
            {
                title: "2. La Barrera Infranqueable (Husky & Lint-Staged)",
                code: [
                    "npm install husky lint-staged --save-dev",
                    "npx husky init",
                    "",
                    "echo 'npx lint-staged' > .husky/pre-commit",
                    "",
                    "// lint-staged.config.js",
                    "export default {",
                    "  '*.{ts,js,astro}': [",
                    "    'eslint --fix',",
                    "    'prettier --write',",
                    "    'vitest run --related --passWithNoTests'",
                    "  ]",
                    "};",
                ],
            },
            {
                title: "3. El Check Final: Tipado Estricto",
                code: [
                    "// tsconfig.json",
                    "{",
                    "  'compilerOptions': {",
                    "    'strict': true,",
                    "    'noImplicitAny': true,",
                    "    'strictNullChecks': true,",
                    "    'noUnusedLocals': true,",
                    "    'noUnusedParameters': true,",
                    "    'noEmit': true",
                    "  }",
                    "}",
                ],
            },
        ],
    },
    {
        id: "ansiedad-stores",
        title: "Ansiedad por las Stores",
        date: "2025-12-24",
        image: "ansiedad-stores.webp",
        error: "Color Beat estaba listo hace semanas. Sin embargo, el pánico a lo burocrático —las capturas de pantalla, las descripciones SEO, las políticas de privacidad y el proceso técnico de subida a Google Play— se convirtió en mi mayor enemigo. Lo que eran meros trámites los transformé mentalmente en una montaña insuperable, una 'bola' de ansiedad que drenó mi energía y postergó el lanzamiento sin motivo técnico real.",
        lesson: "Paso a paso, la montaña no es tan alta. Al final, dedicarle dos tardes a picar piedra burocrática te quita un peso de encima que llevas arrastrando meses. Ha sido el motivo de este retraso, pero nunca lo será para el siguiente juego: ahora que el camino está trillado, la publicación se integra como una fase más del desarrollo, no como un evento traumático final. Lección aprendida: No dejes que el marketing de guerrilla y la administración te paralicen el código.",
        tags: ["burocracia", "mindset", "lanzamiento", "stores"],
    },
    {
        id: "color-beat-arbol-habilidades",
        title: "Color Beat y su Árbol de Habilidades (El 3:1 del Infierno)",
        date: "2025-12-24",
        image: "color-beat-fail.webp",
        error: "Color Beat era un juego casual terminado. Pero mi síndrome del 'Dios Desarrollador' y mi obsesión por los *rogue-lites* me obligaron a sabotearlo. Le incrusté un monstruoso árbol de habilidades hexágonal con sinergias complejas en un juego que solo necesitaba colores. Convertí un sprint de tres semanas en un maratón de 2 meses, con la guinda de la soberbia: lo hice todo antes de que un solo jugador validara si quería esa complejidad.",
        lesson: "El QA no es una fase; es una penitencia por tu arrogancia. La métrica es clara: El tiempo de QA superó al desarrollo por un doloroso 3 a 1. Tres veces más tiempo depurando que creando, solo para garantizar que dos habilidades distintas no crasheen el juego. Lección: Keep it cutre. Un juego simple y vivo vale infinitamente más que una arquitectura preciosa que nadie jugará.",
    },
    {
        id: "caos-traducciones",
        title: "El Caos de las Traducciones",
        date: "2025-11-15",
        image: "translation-chaos.webp",
        error: "Para un proyecto pequeño, gestionar las traducciones en diferentes idiomas puede ser muy caótico. Archivos desincronizados, claves perdidas y la incertidumbre de si el idioma secundario está al día con el principal convierten la localización en una pesadilla de mantenimiento.",
        lesson: "La solución simple y funcional: separar las traducciones en ficheros por categorías y testear cada una de ellas, siempre usando el idioma base como fuente de verdad. Implementé una comparativa automática fichero a fichero de todas las keys (key por key, no solo el número total). Un test fácil de programar que garantiza una consistencia del 100%. Para pequeñas aplicaciones o desarrolladores indie, este pequeño esfuerzo inicial es ideal.",
        tags: ["i18n", "testing", "productividad", "indie-dev"],
        codeSteps: [
            {
                title: "1. Preparación del Entorno",
                code: [
                    "const REFERENCE_LANG = 'es';",
                    "const TARGET_LANGS = ['en', 'de', 'fr', 'it', 'pt'];",
                    "const TRANSLATION_FILES = ['ui', 'fortunes', 'bestiary'];",
                ],
            },
            {
                title: "2. El Algoritmo de Paridad",
                code: [
                    "it('should have 100% key parity across all files', () => {",
                    "  TARGET_LANGS.forEach(lang => {",
                    "    TRANSLATION_FILES.forEach(file => {",
                    "      const baseKeys = Object.keys(load(REFERENCE_LANG, file));",
                    "      const targetData = load(lang, file);",
                    "      ",
                    "      baseKeys.forEach(key => {",
                    "        if (!Object.hasOwn(targetData, key)) {",
                    "          throw new Error(`Missing key [${key}] in file [${file}] for language [${lang}]`);",
                    "        }",
                    "      });",
                    "    });",
                    "  });",
                    "});",
                ],
            },
            {
                title: "3. Extra: Detectar Valores Vacíos",
                code: [
                    "it('should not have empty translations', () => {",
                    "  TARGET_LANGS.forEach(lang => {",
                    "    TRANSLATION_FILES.forEach(file => {",
                    "      const targetData = load(lang, file);",
                    "      ",
                    "      Object.entries(targetData).forEach(([key, value]) => {",
                    "        if (typeof value === 'string' && value.trim() === '') {",
                    "          throw new Error(`Empty value for [${key}] in [${file}] for [${lang}]`);",
                    "        }",
                    "      });",
                    "    });",
                    "  });",
                    "});",
                ],
            },
        ],
    },
];
