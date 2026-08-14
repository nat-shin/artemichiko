// ArteMichiko — Vitest (doc 8 §25.2: unidades, mismo ecosistema Vite de Astro)

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "node",
		include: ["src/**/*.test.{ts,tsx}"],
		exclude: ["src/**/e2e/**", "node_modules/**", "dist/**"],
	},
});
