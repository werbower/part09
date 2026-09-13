import js from '@eslint/js'
import {defineConfig} from 'eslint/config'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig({
  files: ['**/*.{js,ts}'],
  plugins: {
    '@stylistic': stylistic
  },
  extends: [js.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': ['error', 'never']
  }
})