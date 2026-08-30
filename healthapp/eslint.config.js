import js from '@eslint/js'
import {defineConfig} from 'eslint/config'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  files: ['**/*.{js,ts}'],
  ignores: ['dist/**', 'node_modules/**'],
  plugins: {
    '@stylistic': stylistic
  },
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic
  ],
  rules: {

    "@typescript-eslint/consistent-type-definitions": "off",
    '@typescript-eslint/no-unused-vars': [
      "error", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': ['error', 'never']
  }
})