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

                        
                        const regex = new RegExp("", "g");
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
            "**/.astro/**"
        ]
    },
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs["flat/recommended"],

    {
        plugins: {
            "no-comments": noComments,
            "custom": customCommentsPlugin
        },

        rules: {
            "no-comments/disallowComments": "error",
            "custom/no-html-comments": "error",
            "custom/no-css-comments": "error",

            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
];
