import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true
    }),
    react(),
    tailwindcss(),
    checker({
      typescript: {
        buildMode: true
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 4200,
    proxy: {
      "/api/node": {
        target: "http://localhost:8085",
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    exclude: ["@tanstack/react-query-devtools"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
