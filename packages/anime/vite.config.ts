import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: './src/index.ts',
      name: 'anime',
      fileName: format => `anime.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          format: 'es',
          globals: {
            vue: 'Vue',
          },
          entryFileNames(chunkInfo) {
            if (chunkInfo.name.includes('node_modules'))
              return `${chunkInfo.name.replace(/node_modules/g, 'external')}.mjs`
            return '[name].mjs'
          },
          dir: './dist/es',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
})
