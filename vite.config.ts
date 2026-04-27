import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-report.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'vendor-react'
            }

            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }

            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'vendor-forms'
            }

            if (id.includes('marked') || id.includes('dompurify')) {
              return 'vendor-markdown'
            }

            return 'vendor'
          }
        },
      },
    },
  },
})