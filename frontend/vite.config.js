import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react"; // Separate React
            if (id.includes("lodash")) return "vendor-lodash"; // Separate lodash
            return "vendor"; // Separate general dependencies
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit
  },
});
