import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['vue'],
    esbuildOptions(options) {
      options.banner = {
        js: '/* vue-anime - A Vue3/Nuxt animation library inspired by Anime.js */',
      };
    },
  },
  {
    entry: ['src/nuxt/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['vue', 'vue-anime'],
    outDir: 'dist/nuxt',
    esbuildOptions(options) {
      options.banner = {
        js: '/* vue-anime/nuxt - Nuxt module for vue-anime */',
      };
    },
  }
]); 