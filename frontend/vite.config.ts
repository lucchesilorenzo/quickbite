/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    server: {
      deps: {
        inline: [
          "@mui/material",
          "@mui/system",
          "@mui/styled-engine",
          "@mui/icons-material",
          "@mui/x-date-pickers",
          "@mui/x-data-grid",
        ],
      },
    },
    setupFiles: "./tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
      "@public": path.resolve(__dirname, "./src/features/public"),
      "@private": path.resolve(__dirname, "./src/features/private"),
      "@customer": path.resolve(__dirname, "./src/features/private/customer"),
      "@partner": path.resolve(__dirname, "./src/features/private/partner"),
      "@rider": path.resolve(__dirname, "./src/features/private/rider"),
    },
  },
});
