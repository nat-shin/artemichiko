// ArteMichiko — Astro 7 sobre Cloudflare nativo (doc 8 §21.3 + investigación 2026-08-13)
// output: 'static' — 17 páginas de contenido + islas React lazy (sin DB, sin tienda)
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://artemichiko.com",
  output: "static",
  security: {
    csp: true, // CSP con hash automático de scripts inline (clave correcta: security.csp)
  },
  adapter: cloudflare({
    imageService: "cloudflare-binding",
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
