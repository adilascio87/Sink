import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `SINGLE=1` produces one self-contained .html file (all JS + CSS inlined) that
// opens by double-clicking — no server, no hosting. Otherwise a normal static
// build with a relative base, which also works opened directly or on any host.
const single = process.env.SINGLE === '1'

export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss(), ...(single ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: single
    ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000, cssCodeSplit: false }
    : {},
})
