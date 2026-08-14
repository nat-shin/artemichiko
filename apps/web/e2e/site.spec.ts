import { expect, test } from "@playwright/test";

// Humo e2e (doc 8 §25.2): identidad de marca, navegación, matriculación → wa.me,
// modal de video y 404. Corre con `pnpm test:e2e` (webServer = pnpm dev, baseURL 4321).

test("home carga con identidad de marca", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/ArteMichiko/);
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		/arte como/i,
	);
});

test("galería navegable", async ({ page }) => {
	await page.goto("/galeria");
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("inscripción → wa.me", async ({ page }) => {
	// Stub de window.open: captura el enlace generado sin navegar a wa.me
	// (determinista y sin dependencia de red externa).
	await page.addInitScript(() => {
		const opened: string[] = [];
		(window as unknown as { __openedUrls: string[] }).__openedUrls = opened;
		(window as unknown as { open: (url?: string | URL) => null }).open = (
			url,
		) => {
			opened.push(String(url));
			return null;
		};
	});

	await page.goto("/inscripcion");
	await page.getByLabel("Tu nombre").fill("Ana García");
	await page.getByLabel("Curso de interés").selectOption("Pintura al Óleo");
	await page.getByRole("button", { name: /continuar por whatsapp/i }).click();

	const urls = await page.evaluate(
		() => (window as unknown as { __openedUrls?: string[] }).__openedUrls ?? [],
	);
	expect(urls).toHaveLength(1);

	const url = new URL(urls[0] ?? "");
	expect(url.hostname).toBe("wa.me");
	expect(url.pathname).toBe("/5215512595906");
	const texto = url.searchParams.get("text") ?? "";
	expect(texto).toContain("Pintura al Óleo");
	expect(texto).toContain("Ana García");
});

test("modal video se abre y cierra", async ({ page }) => {
	await page.goto("/");
	await page.waitForFunction(() => !document.getElementById("preloader"));
	await page.getByRole("button", { name: /video/i }).first().click();
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await page.getByRole("button", { name: /cerrar/i }).click();
	await expect(dialog).toBeHidden();
});

test("nav enlaza a todas las páginas", async ({ page }) => {
	for (const ruta of [
		"/galeria",
		"/cursos",
		"/comunidad",
		"/nosotros",
		"/inscripcion",
	]) {
		await page.goto(ruta);
		await expect(page.locator("main")).toBeVisible();
	}
});

test("404 funciona", async ({ page }) => {
	await page.goto("/ruta-que-no-existe");
	await expect(page.getByText(/perdiste|taller/i).first()).toBeVisible();
});
