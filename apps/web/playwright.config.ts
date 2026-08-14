// ArteMichiko — Playwright e2e (doc 8 §25.2: gate obligatorio de deploy)
// Flujos críticos: matriculación completa + filtrado de galería sin recarga
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: "html",
	use: {
		baseURL: "http://127.0.0.1:4321",
		trace: "on-first-retry",
	},
	projects: [
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
		{ name: "firefox", use: { ...devices["Desktop Firefox"] } },
		{ name: "webkit", use: { ...devices["Desktop Safari"] } },
	],
	webServer: {
		command: "pnpm dev",
		url: "http://127.0.0.1:4321",
		reuseExistingServer: !process.env.CI,
	},
});
