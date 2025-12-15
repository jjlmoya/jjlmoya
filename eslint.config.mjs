import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import noComments from 'eslint-plugin-no-comments';

const customCommentsPlugin = {
    rules: {
        "no-html-comments": {
            meta: {
                type: "layout",
                fixable: "whitespace",
            },
            create(context) {
                return {
                    Program() {
                        const sourceCode = context.sourceCode;
                        const text = sourceCode.getText();

                        // Regex for HTML comments: <!-- ... -->
                        const regex = new RegExp("<!--[\\s\\S]*?-->", "g");
                        let match;
                        while ((match = regex.exec(text)) !== null) {
                            context.report({
                                loc: sourceCode.getLocFromIndex(match.index),
                                message: "HTML comments are forbidden.",
                                fix(fixer) {
                                    return fixer.removeRange([match.index, match.index + match[0].length]);
                                }
                            });
                        }
                    }
                };
            }
        },
        "no-css-comments": {
            meta: {
                type: "layout",
                fixable: "whitespace",
            },
            create(context) {
                return {
                    Program() {
                        const sourceCode = context.sourceCode;
                        const text = sourceCode.getText();

                        // Regex for CSS/Block comments: /* ... */
                        const regex = new RegExp("/\\*[\\s\\S]*?\\*/", "g");
                        let match;
                        while ((match = regex.exec(text)) !== null) {
                            context.report({
                                loc: sourceCode.getLocFromIndex(match.index),
                                message: "CSS/Block comments are forbidden.",
                                fix(fixer) {
                                    return fixer.removeRange([match.index, match.index + match[0].length]);
                                }
                            });
                        }
                    }
                };
            }
        }
    }
};

export default [
    {
        ignores: [
            "**/dist/",
            "**/node_modules/",
            ".astro/",
            "**/.astro/**",
            "**/public/**"
        ]
    },
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs["flat/recommended"],

    // General Rules (apply to all supported files)
    {
        plugins: {
            "no-comments": noComments,
        },
        rules: {
            "no-comments/disallowComments": "error",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    },

    // Scoped Rules: HTML Comments (Astro, HTML)
    {
        files: ["**/*.astro", "**/*.html"],
        plugins: {
            "custom": customCommentsPlugin
        },
        rules: {
            "custom/no-html-comments": "error"
        }
    },

    // Scoped Rules: CSS Comments (Astro, CSS)
    {
        files: ["**/*.astro", "**/*.css"],
        plugins: {
            "custom": customCommentsPlugin
        },
        rules: {
            "custom/no-css-comments": "error"
        }
    }
];
