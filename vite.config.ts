import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/cli.ts'),
      name: 'VueMessDetector',
      fileName: format => `vue-mess-detector.${format}.js`,
      formats: ['es'], // Use only 'es'
    },
    rollupOptions: {
      external: ['yargs', 'node:fs/promises', 'node:fs', 'fs', 'node:path', 'path', '@vue/compiler-sfc', 'vue', 'util', 'assert', 'node:url', 'url', 'os'],
      output: {
        globals: {
          'yargs': 'yargs',
          'node:fs': 'node:fs',
          'node:fs/promises': 'node:fs/promises',
          'fs': 'fs',
          'node:path': 'node:path',
          'path': 'path',
          '@vue/compiler-sfc': 'compilerSfc',
          'vue': 'Vue',
          'util': 'util',
          'assert': 'assert',
          'node:url': 'node:url',
          'url': 'url',
          'os': 'os',
        },
      },
    },
    outDir: 'dist',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['yargs', '@vue/compiler-sfc'],
  },
})
