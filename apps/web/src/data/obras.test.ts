import { describe, expect, it } from "vitest";
import { obras, tecnicas } from "./obras";

// Unidades del catálogo (doc 8 §25.2): la galería y las fichas /galeria/[slug]
// dependen de estos invariantes — un drift aquí rompe grid, filtros y SEO de imagen.

describe("obras", () => {
	it("tiene exactamente 10 obras", () => {
		expect(obras).toHaveLength(10);
	});

	it("cada obra tiene slug único en kebab-case", () => {
		const slugs = obras.map((obra) => obra.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) {
			expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
		}
	});

	it("cada obra tiene título no vacío", () => {
		for (const obra of obras) {
			expect(obra.titulo.trim()).not.toBe("");
		}
	});

	it("cada obra tiene alt descriptivo que menciona la academia", () => {
		for (const obra of obras) {
			expect(obra.alt.length).toBeGreaterThan(20);
			expect(obra.alt).toContain("ArteMichiko");
		}
	});

	it("cada obra declara una técnica válida del catálogo", () => {
		for (const obra of obras) {
			expect(tecnicas).toContain(obra.tecnica);
		}
	});

	it("todas las técnicas del catálogo están representadas", () => {
		const usadas = new Set(obras.map((obra) => obra.tecnica));
		for (const tecnica of tecnicas) {
			expect(usadas).toContain(tecnica);
		}
	});

	it("cada obra declara año, dimensiones y descripción", () => {
		for (const obra of obras) {
			expect(obra.ano).toMatch(/^\d{4}$/);
			expect(obra.dimensiones).toMatch(/\d/);
			expect(obra.descripcion.trim()).not.toBe("");
		}
	});

	it("el catálogo de técnicas tiene 6 entradas sin duplicados", () => {
		expect(tecnicas).toHaveLength(6);
		expect(new Set(tecnicas).size).toBe(tecnicas.length);
	});
});
