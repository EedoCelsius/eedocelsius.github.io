import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const showcaseRoot = path.resolve(__dirname, 'showcase')
const libraryRoot = path.resolve(__dirname, 'library')

export default defineConfig({
  root: showcaseRoot,
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(showcaseRoot, 'src'),
      '@library': libraryRoot,
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  publicDir: path.resolve(showcaseRoot, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
