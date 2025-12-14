import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import noComments from 'eslint-plugin-no-comments';

const noHtmlCommentsPlugin = {
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
                        
                        const regex = //g;
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
        }
    }
};

export default [
    
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs["flat/recommended"],

    {
        
        plugins: {
            "no-comments": noComments,
            "custom": noHtmlCommentsPlugin
        },
        
        rules: {
            "no-comments/disallowComments": "error",
            "custom/no-html-comments": "error",
            
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off"
        }
    }
];
