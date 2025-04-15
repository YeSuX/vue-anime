import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  external: ['vue'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use strict";',
    }
  },
})
