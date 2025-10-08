import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const playgroundRoot = path.resolve(__dirname, 'playground')
const libraryRoot = path.resolve(__dirname, 'library')

export default defineConfig({
  root: playgroundRoot,
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(playgroundRoot, 'src'),
      '@library': libraryRoot,
      '@shared': path.resolve(__dirname, 'shared'),
    },
  },
  publicDir: path.resolve(playgroundRoot, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
