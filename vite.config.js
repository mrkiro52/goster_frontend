import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/goster_by_kiro/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
