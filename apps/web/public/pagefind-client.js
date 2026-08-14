// ArteMichiko — Cliente de búsqueda Pagefind (módulo externo, CSP-safe)
// Pagefind 1.5 expone { search, init, debouncedSearch } como exports ESM.
// Este archivo se sirve como /pagefind-client.js con type="module" —
// el import dinámico desde un módulo externo NO usa eval, así que el CSP
// (script-src 'self' + hashes) lo permite sin unsafe-eval.
let mod = null;
let probe = null;

async function load() {
	if (mod) return mod;
	try {
		mod = await import("/pagefind/pagefind.js");
	} catch (e) {
		console.warn("Pagefind no disponible:", e);
	}
	return mod;
}

// Sonda memoizada (una vez por sesión): en `astro dev` el índice
// /pagefind/ NO existe (solo `astro build` lo genera), así que esta sonda
// permite a la UI mostrar un fallback elegante en vez de un import() roto.
// Usa fetch HEAD — mismo origen, permitido por connect-src 'self' del CSP.
async function available() {
	if (probe !== null) return probe;
	probe = false;
	try {
		const res = await fetch("/pagefind/pagefind.js", { method: "HEAD" });
		probe = res.ok;
	} catch (e) {
		console.warn("Sonda Pagefind fallida:", e);
	}
	return probe;
}

window.__artemichikoSearch = {
	async search(term) {
		const m = await load();
		if (!m?.search) return { results: [], unavailable: true };
		return m.search(term);
	},
	available,
};
