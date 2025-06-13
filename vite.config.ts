import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
    strictPort: true, // Fail if port is already in use
    proxy: {
      '/api': {
        target: 'http://192.168.86.70',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
