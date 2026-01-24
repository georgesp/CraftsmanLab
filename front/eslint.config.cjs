const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'build/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // ESLint recommended
      ...require('eslint/use-at-your-own-risk').builtinRules.get('recommended'),
      
      // TypeScript recommended
      ...typescriptEslint.configs.recommended.rules,
      
      // React recommended
      ...reactPlugin.configs.recommended.rules,
      
      // React Hooks recommended
      ...reactHooksPlugin.configs.recommended.rules,
      
      // Custom overrides
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // TypeScript gère la validation des props
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn', // warn au lieu d'error
      '@typescript-eslint/no-require-imports': 'off', // Pour les fichiers API Node.js
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
