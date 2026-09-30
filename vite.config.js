import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import seo from './vite-plugin-seo.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
})
