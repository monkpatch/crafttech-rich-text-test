import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'http://monkpatch.github.io/crafttech-rich-text-test',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
