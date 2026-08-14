// ArteMichiko — Astro 7 sobre Cloudflare nativo (doc 8 §21.3 + investigación 2026-08-13)
// output: 'static' — 17 páginas de contenido + islas React lazy (sin DB, sin tienda)

import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://artemichiko.com",
	output: "static",
	security: {
		csp: {
			// CSP con hash automático de scripts/styles inline (Astro emite meta tag en
			// static). Directivas extra para recursos externos reales del sitio:
			// - img-src: placehold.co (galería/obras placeholder) + i.ytimg.com (miniaturas VideoModal)
			// - frame-src: youtube-nocookie.com (único iframe del sitio, VideoModal)
			directives: [
				"default-src 'self'",
				"img-src 'self' data: https://placehold.co https://i.ytimg.com",
				"frame-src https://www.youtube-nocookie.com",
				"media-src 'self'",
				"font-src 'self'",
				"connect-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'self'",
			],
		},
	},
	adapter: cloudflare({
		imageService: "cloudflare-binding",
	}),
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
