import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Auto-detect deployment platform: Vercel sets process.env.VERCEL
const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER)
const base = isVercel ? '/' : (process.env.VITE_BASE || '/resume_maker/')

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})