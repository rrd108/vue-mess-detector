import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueMessDetector',
      fileName: format => `vue-mess-detector.${format}.js`,
      formats: ['es', 'umd'], // Use only 'es' and 'umd' formats
    },
    rollupOptions: {
      external: ['yargs', 'node:fs/promises', 'node:fs', 'fs', 'node:path', 'path', '@vue/compiler-sfc', 'vue', 'util', 'assert', 'url'],
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
          'url': 'url',
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
