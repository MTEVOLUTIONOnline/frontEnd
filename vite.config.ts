import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Configuração para redirecionar todas as rotas para o index.html, útil para SPAs
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    open: true,
  },
  // Redireciona todas as requisições para o index.html para lidar com rotas do SPA
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  }
});
