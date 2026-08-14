import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Los cursos viven inline en el frontmatter de cursos.astro (no hay data module).
// Este test valida la estructura del bloque declarado para detectar drift accidental
// (un curso sin docente o con slug duplicado rompería catálogo y fichas /cursos/[slug]).

const src = readFileSync(new URL("./cursos.astro", import.meta.url), "utf8");

function bloqueCursos(fuente: string): string {
	const inicio = fuente.indexOf("const cursos = [");
	const fin = fuente.indexOf("];", inicio);
	return fuente.slice(inicio, fin + 2);
}

function contar(texto: string, patron: RegExp): number {
	return (texto.match(patron) ?? []).length;
}

const bloque = bloqueCursos(src);

describe("cursos (frontmatter inline de cursos.astro)", () => {
	it("declara 6 cursos", () => {
		expect(contar(bloque, /\bslug:\s*"/g)).toBe(6);
	});

	it("cada curso tiene slug único", () => {
		const slugs = [...bloque.matchAll(/\bslug:\s*"([^"]+)"/g)].map((m) => m[1]);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it("cada curso declara título, nivel, duración, docente, descripción e imagen", () => {
		expect(contar(bloque, /\btitulo:\s*"/g)).toBe(6);
		expect(contar(bloque, /\bnivel:\s*"/g)).toBe(6);
		expect(contar(bloque, /\bduracion:\s*"/g)).toBe(6);
		expect(contar(bloque, /\bdocente:\s*"/g)).toBe(6);
		expect(contar(bloque, /\bdescripcion:\s*"/g)).toBe(6);
		expect(contar(bloque, /\bimagen:\s*"/g)).toBe(6);
	});
});
