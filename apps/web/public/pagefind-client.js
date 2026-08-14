// ArteMichiko — Cliente de búsqueda Pagefind (módulo externo, CSP-safe)
// Pagefind 1.5 expone { search, init, debouncedSearch } como exports ESM.
// Este archivo se sirve como /pagefind-client.js con type="module" —
// el import dinámico desde un módulo externo NO usa eval, así que el CSP
// (script-src 'self' + hashes) lo permite sin unsafe-eval.
let mod = null;

async function load() {
	if (mod) return mod;
	try {
		mod = await import("/pagefind/pagefind.js");
	} catch (e) {
		console.warn("Pagefind no disponible:", e);
	}
	return mod;
}

window.__artemichikoSearch = {
	async search(term) {
		const m = await load();
		if (!m?.search) return { results: [] };
		return m.search(term);
	},
};
