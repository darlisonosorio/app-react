import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import federation from '@originjs/vite-plugin-federation'
import modules from "./modules"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    federation({
      name: 'react-app',
      filename: "hostEntry.js",
      remotes: modules,
      exposes: {
        './BaseService': './src/services/BaseService.ts',
        './Toolbar': './src/components/Toolbar.tsx',
        './ConfirmModal': './src/components/ConfirmModal.tsx',
      },
      shared: [
        'react', 
        'react-dom', 
        'react-router-dom',
        "@reduxjs/toolkit",
        'axios',
        'react-toastify'
      ]
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    cors: {
      origin: ["http://localhost:80"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["*"]
    }
  }
})
