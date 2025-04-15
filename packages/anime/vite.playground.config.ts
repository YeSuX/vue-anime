import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, 'playground'),
  build: {
    outDir: resolve(__dirname, 'playground/dist'),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@anime': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
}) 