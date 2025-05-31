import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/query/recommended',
  ),
  {
    plugins: ['@typescript-eslint/eslint-plugin', '@tanstack/query'],
    ignorePatterns: ['.eslintrc.js'],
    plugins: {
      tailwindcss: require('eslint-plugin-tailwindcss'),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      'tailwindcss/no-custom-classname': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@tanstack/query/exhaustive-deps': 'warn',
      '@tanstack/query/stable-query-key': 'error',
    },
  },
];

export default eslintConfig;
