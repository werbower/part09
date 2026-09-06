import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercepts any request starting with /api
      '/api': {
        target: 'http://localhost:3000', // Your backend server address
        changeOrigin: true,             // Changes the origin header to match the target
        secure: false,                  // Set to false if backend uses self-signed HTTPS
      }
    }
  }
})
