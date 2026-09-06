import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import {defineConfig } from 'eslint/config'

export default defineConfig({
  files: ['**/*.{ts,js}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic
  ],
  
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/indent': ['error', 2],
    '@stylistic/semi': ['error', 'never'],   
  },
})
