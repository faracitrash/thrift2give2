import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/styles": path.resolve(__dirname, "./styles"),
      "@/utils": path.resolve(__dirname, "./components/ui/utils"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  server: {
    port: 3000,
    host: true,
    open: true,
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot']
        }
      }
    }
  },
  css: {
    devSourcemap: true
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})