# Guía de desarrollo — ArteMichiko

## Requisitos

- **Node** `~24` (ver `engines` en `package.json`)
- **pnpm** `10.33.2` vía corepack: `corepack enable && corepack prepare pnpm@10.33.2 --activate`
- **Wrangler** (solo para deploy): incluido como devDependency de `apps/web`

## Instalación

```bash
pnpm install
```

## Flujo de trabajo diario

```bash
pnpm dev          # http://localhost:4321 — dev server de Astro
pnpm lint         # Biome check (corre antes de commitear)
pnpm typecheck    # astro check (TypeScript estricto)
pnpm test         # Vitest (unitarios)
pnpm test:e2e     # Playwright (flujos críticos)
pnpm build        # Build de producción → apps/web/dist/
pnpm preview      # Previsualizar el build
```

## Estructura del sitio (`apps/web/`)

| Carpeta | Propósito |
|---|---|
| `src/pages/` | Páginas estáticas (`index`, `galeria`, `cursos`, `blog`, `contacto`, `inscripcion`, …) y dinámicas `[slug]` |
| `src/layouts/` | `Layout.astro`: shell común, JSON-LD, meta tags, CSP |
| `src/components/` | Componentes compartidos (ej. `VideoModal.astro`) |
| `src/data/` | Datos estáticos (ej. `obras.ts`) — **no hay base de datos** |
| `src/styles/` | `global.css` con tokens "Barro y Tinta" (Tailwind v4 `@theme`) |
| `public/` | `robots.txt`, `llms.txt`, `llms-full.txt`, `_headers`, favicons |

## Convenciones del sitio

### Islas React

- Astro genera **HTML estático con cero JS por defecto**.
- React solo se monta como isla (`client:load` / `client:visible`) donde la interacción lo exige (hero, galería, inscripción).
- Estado compartido entre islas: **nanostores** (`@artemichiko/web`), nunca contexto global.

### Seguridad

- CSP configurada en `astro.config.mjs` (`security.csp`) — Astro emite meta tag con hash automático.
- Headers adicionales en `public/_headers` (HSTS, nosniff, XFO, COOP, CORP, Permissions-Policy). Si agregas un recurso externo nuevo (imagen, iframe, script), actualiza ambas superficies.
- Formularios: mantener el **honeypot** anti-spam de `inscripcion.astro`.
- Regla: `object-src 'none'`, nunca `unsafe-inline` en CSP.

### SEO / GEO

- Todo contenido debe existir **sin JS** (HTML estático indexable).
- JSON-LD global en `Layout.astro`; schema específico por página si aplica.
- `robots.txt` y `llms.txt` son archivos vivos: si agregas una sección nueva, regístrala en `llms.txt`.

### Accesibilidad y motion

- WCAG 2.2 AA: contraste mínimo 4.5:1, navegación por teclado, `prefers-reduced-motion` respetado en toda animación (GSAP y Lenis incluidos).
- Animaciones pesadas solo en hero/galería; páginas de contenido usan CSS nativo.

## QA de performance

```bash
pnpm qa                    # Lighthouse sobre http://localhost:4321
./scripts/qa-lighthouse.sh https://artemichiko.com   # producción + CrUX vía PSI
```

## Reglas de git (obligatorias)

1. Remote vía **SSH**: `git@github.com:nat-shin/artemichiko.git` (nunca HTTPS).
2. Commits **atómicos** con paths explícitos: `git add apps/web/src/...` — **nunca `git add -A`**.
3. `historico/` no se versiona.
4. Antes de commitear: `pnpm lint && pnpm typecheck && pnpm test`.
