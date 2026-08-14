# ArteMichiko — Centro Cultural Académico de Dibujo y Pintura Artística

Sitio web oficial de **ArteMichiko**, centro cultural de dibujo y pintura artística en Ciudad de México, fundado hacia 1992. Única institución en México con **Sistema Oriental** de enseñanza, formada bajo la tradición de la Academia Central de Bellas Artes de Beijing.

- **Fundador y director:** Mtro. José Guadalupe Cabrera — egresado de La Esmeralda, becario de la Academia Central de Bellas Artes de Beijing, posgrado en pintura mural.
- **Subdirectora:** Mtra. Elvira Mena.
- **Matriculación:** conversacional, vía WhatsApp (sin base de datos, sin portal).

Sitio estático de **35 páginas** (17 de contenido + dinámicas de galería, cursos y blog) con identidad blanco / negro / dorado / jade, desplegado sobre **Cloudflare** (Workers Static Assets).

---

## Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | [Astro](https://astro.build) 7.2 | `output: 'static'`, adaptador nativo `@astrojs/cloudflare` |
| UI interactiva | React 19.2 | Islas lazy (`client:load` / `client:visible`) solo donde se necesitan |
| Estilos | Tailwind CSS v4.3 | Motor Oxide; tokens del sistema "Barro y Tinta" |
| Animación | GSAP 3.15 + Lenis 1.3 | Hero (scramble + SplitText), scroll suave |
| Estado compartido | nanostores | Estado entre islas sin framework pesado |
| Lenguaje | TypeScript ~6.0 | Estricto, verificado con `astro check` |
| Lint / formato | Biome 2.5 | Un solo binario (Rust) para lint + format |
| Tests | Vitest 4 + Playwright 1.62 | Unitarios + e2e |
| QA | Lighthouse 13 | `scripts/qa-lighthouse.sh` (local + PSI/CrUX) |
| Paquetería | pnpm 10.33 (corepack) | Monorepo con workspaces |
| Runtime | Node ~24 | Requerido por engine |
| Infraestructura | Cloudflare Workers Static Assets + Pages | `wrangler` 4.123, CSP y headers en el edge |
| Dominio | [artemichiko.com](https://artemichiko.com) | `site` canónico en `astro.config.mjs` |

## Estructura del proyecto

```
artemichiko/
├── apps/web/                    # Sitio (Astro)
│   ├── src/
│   │   ├── pages/               # 17 páginas estáticas + [slug] (galería, cursos, blog)
│   │   ├── layouts/Layout.astro # Shell común + JSON-LD + CSP meta
│   │   ├── components/          # VideoModal.astro, islas React
│   │   ├── data/obras.ts        # Catálogo de obras (sin DB)
│   │   └── styles/global.css    # Tokens "Barro y Tinta" (Tailwind v4 @theme)
│   ├── public/
│   │   ├── robots.txt           # Crawlers clásicos + 14 bots de IA permitidos
│   │   ├── llms.txt             # Descubribilidad para agentes (LLMO)
│   │   ├── llms-full.txt        # Versión extendida
│   │   └── _headers             # HSTS, nosniff, XFO, COOP, CORP, CSP de assets
│   ├── astro.config.mjs         # CSP, sitemap, adaptador Cloudflare
│   ├── playwright.config.ts
│   └── vitest.config.ts
├── scripts/
│   └── qa-lighthouse.sh         # QA de performance (Lighthouse + PSI)
├── 0-…-10-…-ArteMichiko_*.md    # Documentos estratégicos (ver sección abajo)
├── docs/                        # Guías (desarrollo, deploy)
├── .opencode/                   # Config del agente + skills del sistema de diseño
└── historico/                   # Versiones anteriores (NO versionado)
```

## Comandos de desarrollo

| Comando | Descripción |
|---|---|
| `pnpm install` | Instala dependencias (corepack fija pnpm 10.33.2) |
| `pnpm dev` | Servidor de desarrollo (Astro, puerto 4321) |
| `pnpm build` | Build de producción → `apps/web/dist/` |
| `pnpm preview` | Previsualiza el build local |
| `pnpm typecheck` | `astro check` en todos los workspaces |
| `pnpm test` | Tests unitarios (Vitest) |
| `pnpm test:e2e` | Tests end-to-end (Playwright) |
| `pnpm lint` | Biome check en todo el repo |
| `pnpm format` | Biome format --write |
| `pnpm audit` | Auditoría de dependencias de producción |
| `pnpm qa` | Lighthouse + PageSpeed Insights (CrUX) |

## Documentos estratégicos

| Documento | Contenido |
|---|---|
| `0-ArteMichiko_MAESTRO_Consolidado.md` | Fuente única de verdad del proyecto (estrategia + stack + arquitectura), v2.0 |
| `6-ArteMichiko_Estrategia_Digital_Definitiva.md` | Estrategia digital base: galería, umbral, matriculación, diseño, edge, SEO, legal, roadmap |
| `7-ArteMichiko_Posicionamiento_Digital_Stack_y_UXUI.md` | Stack tecnológico definitivo, framework Search & AI Visibility, UX/UI por página |
| `8-ArteMichiko_Arquitectura_de_Vanguardia_2026.md` | Arquitectura Astro + Cloudflare, capacidades nativas 2026, GEO con evidencia de terreno |
| `9-ArteMichiko_Investigacion_Skills_Diseno_Europa.md` | Investigación: skills de diseño europeos (blanco + negro + dorado, elegancia) |
| `9-ArteMichiko_Skills_Diseno_MedioOriente_Oro.md` | Investigación: skills de diseño de Medio Oriente (elegancia, oro, lujo árabe/persa) |
| `10-ArteMichiko_Mapa_Estrategico_SEO_GEO_2026.md` | Mapa estratégico SEO/GEO v2: 7 sistemas + agent optimization + medición en 5 niveles |

Documentos auxiliares: `investigacion-efectos-animacion-2026.md`, `MCP-AUDITORIA.md`, `prompt-open-design-home.md`.

## Seguridad

- **CSP** emitida por Astro (`security.csp` en `astro.config.mjs`) con hash automático de scripts/styles inline; CSP adicional de assets en `public/_headers`.
- **Headers de seguridad** en `public/_headers` aplicados por Cloudflare: `Strict-Transport-Security` (2 años, preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`.
- **Anti-spam:** honeypot en el formulario de inscripción (captura bots sin fricción para el usuario).
- **Integridad de recursos:** SRI en assets externos.
- **Dependencias:** 0 vulnerabilidades de producción — dependencias muertas eliminadas (`bb3ee4b`); `pnpm audit` disponible como control recurrente.

## SEO / GEO

- **JSON-LD** global (`EducationalOrganization` + `WebSite`) en `Layout.astro`.
- **`robots.txt`** con 14 crawlers de IA permitidos explícitamente (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc.) — ver doc 6 §5.2.
- **Sitemap** dinámico (`@astrojs/sitemap` → `sitemap-index.xml`) incluyendo cada obra, curso y artículo.
- **`llms.txt` / `llms-full.txt`** en la raíz para descubribilidad de agentes (LLMO).
- **Mapa estratégico** completo en `10-ArteMichiko_Mapa_Estrategico_SEO_GEO_2026.md`: 7 sistemas + optimización para agentes + medición en 5 niveles.

## Cómo contribuir

- **Git:** cuenta `nat-shin` vía SSH. Verificar antes de push: `git remote -v` debe mostrar `git@github.com:nat-shin/artemichiko.git` (nunca HTTPS).
- **Commits atómicos:** `git add <paths explícitos>` — **NUNCA `git add -A`**.
- **`historico/`** está ignorado y no se versiona.
- Antes de commitear: `pnpm lint`, `pnpm typecheck`, `pnpm test`.
- Guías: [`docs/desarrollo.md`](docs/desarrollo.md) (setup y flujo de trabajo) y [`docs/deploy.md`](docs/deploy.md) (despliegue en Cloudflare).

## Licencia

Código privado (`UNLICENSED`). Los documentos estratégicos y el sistema de diseño "Barro y Tinta" son propiedad del proyecto ArteMichiko; su narrativa y arquitectura son atribuibles a los documentos 0–10 listados arriba.
