
import { fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJSXAccessibility from 'eslint-plugin-jsx-a11y';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { defineConfig } from 'vite';

import { viteConfig } from './vite.config.js';

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: {
      js,
      react: pluginReact,
      'react-hooks': fixupPluginRules(pluginReactHooks),
      'jsx-a11y': pluginJSXAccessibility,
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginJSXAccessibility.configs.recommended.rules,

      'no-undef': 'error',
      'no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }],

      //TODO Desactivar validaciones de prop-types
      'react/prop-types': 'off',
      'react/require-default-props': 'off',

      //? Habilita la recla de verficar los nombre de importaciones
      'import/named': 'error',
      'import/no-unresolved': 'error',

      //? Validaciones de importaciones
      // 'import/default': 'error', // Verifica export default válidas
      'import/export': 'error', // Verifica que los archivos no hagan exportaciones inválidas
      'import/namespace': 'error', // Verifica uso correcto de import *
      'import/no-duplicates': 'error', // Evita importar 2 veces el mismo módulo

      //? Reglas de buenas practicas de react
      'react/jsx-no-duplicate-props': 'error', // No repetir props en JSX
      'react/jsx-no-undef': 'error', // Error si usas componentes no definidos
      'react/no-unstable-nested-components': 'warn', // Evita componentes definidos dentro de render (mejor rendimiento)
      'react/no-array-index-key': 'warn', // Evita usar el índice como key (mala práctica)
      'react/self-closing-comp': 'warn', // Autocierre para componentes sin hijos

      'react-hooks/rules-of-hooks': 'error', // Valida reglas de hooks (useEffect, useState, etc.)
      "jsx-a11y/no-autofocus": 'off',

      //TODOD temporalmente desactivado 
      'import/no-named-as-default': 'warn',
      // 'import/order': ['warn', {
      //   groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      //   pathGroups: [
      //     { pattern: 'react', group: 'builtin', position: 'before' },
      //     { pattern: 'react-dom', group: 'builtin', position: 'before' },
      //     { pattern: 'react-router-dom', group: 'builtin', position: 'before' },
      //     { pattern: 'lucide-react', group: 'external', position: 'after' },
      //     { pattern: '@/hooks/**', group: 'internal', position: 'after' },
      //     { pattern: '@/components/**', group: 'internal', position: 'after' }
      //   ],
      //   pathGroupsExcludedImportTypes: ['builtin'],
      //   alphabetize: {
      //     order: 'asc',
      //     caseInsensitive: true
      //   },
      //   'newlines-between': 'always'
      // }],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'warn'
    },

    settings: {
      'import/resolver': {
        typescript: {},
        vite: {
          viteConfig
        },
        node: {
          extensions: ['.js', '.jsx', '.json'],
          caseSensitive: false
        }
      },
      // 'import/ignore': ['react-router-dom'],
      react: { version: 'detect' }
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**']
  }
]);
