// ArteMichiko — Vitest (doc 8 §25.2: unidades, mismo ecosistema Vite de Astro)
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["src/**/e2e/**", "node_modules/**", "dist/**"],
  },
});
