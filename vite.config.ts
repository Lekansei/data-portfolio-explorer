
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Base path for GitHub Pages deployment
  base: "/data-portfolio-explorer/",
  
  // Configure server port
  server: {
    port: 8080,
    host: "::",
    fs: {
      // Autorise l'accès au répertoire du projet et à tous les sous-répertoires
      allow: ['.'],
    },
  },
  
  build: {
    // Settings for production build
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper MIME types
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Generate a 404.html file for GitHub Pages
    emptyOutDir: true,
  },
}));
