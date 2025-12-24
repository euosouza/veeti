// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic, angular.configs.tsRecommended, prettierConfig],
    plugins: {
      prettier: prettierPlugin
    },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ],
      "@angular-eslint/component-class-suffix": [
        "error",
        {
          suffixes: ["Component", "Page", "Directive", "Root", "Layout"]
        }
      ],
      "prettier/prettier": [
        "error",
        {
          printWidth: 180,
          tabWidth: 2,
          semi: true,
          singleQuote: false,
          quoteProps: "as-needed",
          jsxSingleQuote: false,
          trailingComma: "none",
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: "always",
          endOfLine: "lf",
          embeddedLanguageFormatting: "auto"
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      semi: ["error", "always"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }]
    }
  },
  {
    files: ["src/app/libs/**/*.ts"],
    rules: {
      "@angular-eslint/component-selector": "off"
    }
  },
  {
    files: ["**/*.html"],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {}
  }
]);
