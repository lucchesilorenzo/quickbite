import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./src/features/public"),
      "@private": path.resolve(__dirname, "./src/features/private"),
      "@customer": path.resolve(__dirname, "./src/features/private/customer"),
      "@partner": path.resolve(__dirname, "./src/features/private/partner"),
    },
  },
});
