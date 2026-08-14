# ArteMichiko — Animation & Effects Engineering Report (2026-08-14)

> **Purpose**: Complete inventory of every animation, effect, and motion system in the
> ArteMichiko website, with the full technology stack, for deep-research analysis of
> cutting-edge / leading-edge / bleeding-edge improvements compatible with the current stack.
> **Format**: Technical English. Elements and techniques only — no code.
> **Author**: Orchestrator agent · ArteMichiko project

---

## 1. Full Technology Stack (verified, current)

| Layer | Technology | Version/Notes |
|---|---|---|
| Framework | Astro | v7.2.2 (Content Collections, View Transitions support) |
| Frontend | Astro islands (React 19 not used — vanilla/GSAP per island) | 37 pages |
| Styling | Tailwind CSS v4 (Oxide engine, Rust) | CSS-first config `@theme`, OKLCH palette |
| Animation core | GSAP 3.x + ScrollTrigger | 14 files |
| Smooth scroll | Lenis | Layout.astro (12 refs), RAF loop |
| Icons | Custom inline SVG | Generated per concept, no icon library |
| Search | Pagefind | index at build; ESM client `/pagefind-client.js`, CSP-safe |
| Type safety | TypeScript | 0 errors / 0 warnings / 0 hints |
| Lint/format | Biome | clean |
| Tests | Vitest (11) + Playwright (6 e2e, Chromium) | passing |
| Package manager | pnpm | workspaces |
| Build target | Cloudflare Pages/Workers (SSH git, nat-shin) | static output |
| Fonts | Playfair Display / Geist / JetBrains Mono (self-hosted or Google) | `--font-display`, `--font-sans`, `--font-mono` |
| Design tokens | "Barro y Tinta" system | lienzo #FDFBF7, tinta #11110E, oro #D4AF37, jade #00A86B, sello #C3272B; 70/25/5 proportion |
| Motion tokens | ease-ma / ease-respuesta / ease-salida; base 240ms | prefers-reduced-motion enforced everywhere |

---

## 2. Complete Effect Inventory (26 source files audited)

### 2.1 Global systems (Layout.astro / global.css)

| # | Effect | Technique | Files | Status |
|---|---|---|---|---|
| G1 | **Lenis smooth scroll** | RAF loop, lerp-based inertia | Layout.astro (12) | active |
| G2 | **Magnetic buttons** | pointer-tracking transform on hover (GSAP) | Layout.astro (6), global.css | active |
| G3 | **Back-to-top** | scroll-position driven show/hide + smooth scroll | Layout.astro | active |
| G4 | **Mobile drawer menu** | GSAP translateX + overlay fade; `inert` toggling, Tab trap, Esc, focus management | Layout.astro (3) | active |
| G5 | **Header glass blur** | backdrop-filter blur(12px) (creates containing block — documented) | Layout.astro | active |
| G6 | **Textures** | grain / washi / arcilla / seigaiha SVG+CSS overlays | global.css | active |
| G7 | **Preloader** | GSAP timeline, ~0.9s, non-blocking fade | index/Layout/global.css | active |
| G8 | **Print stylesheet** | media print rules | global.css | active |
| G9 | **Skip-link** | a11y focus-only skip link | Layout.astro | active |
| G10 | **100dvh viewport** | dvh fallback vh (mobile URL-bar fix) | global.css | active |
| G11 | **overflow-x: clip** | mobile horizontal-overflow guard (sticky-safe) | global.css | active |
| G12 | **Touch targets ≥44px** | min-size enforcement mobile | global.css | active |

### 2.2 Hero & entrance (index.astro)

| # | Effect | Technique | Status |
|---|---|---|---|
| H1 | **Preloader choreography** | staged reveal of brand mark | active |
| H2 | **Hero text reveal (lines)** | split lines, GSAP reveal with `reveal-inner` spans | active |
| H3 | **Gold shimmer (replaces old scramble)** | CSS `background-clip:text` + `@keyframes shine` 6s loop; gradient `#8a6d1f→#cb9b51→#f6e27a`; reduced-motion → static | active |
| H4 | **Geometric motif / ink-wash background** | SVG texture + parallax drift | active |
| H5 | **Cinematic video tour (Canal 11)** | poster (maxres→hq fallback) + click-to-play iframe `youtube-nocookie`; scroll-driven reveal scale 0.85→1 + blur 24→0; gold light-leak `mix-blend-mode: screen` overlay; glass play button (blur 10px); mobile: fade/scale only | active |
| H6 | **Marquee (techniques banner)** | Mulligan technique: duplicated track, `overflow:hidden` shell, `width:max-content`, gap-in-keyframe loop, pausa en hover | active (index 12 refs) |
| H7 | **Zoom-parallax gallery preview** | GSAP parallax layers, transform-based | active (9 refs) |

### 2.3 Page-level systems (15+ pages)

| # | Effect | Technique | Scope |
|---|---|---|---|
| P1 | **Reveal-up headings** | CSS `@keyframes reveal-up` + IntersectionObserver (4 files) or GSAP (most) | all pages |
| P2 | **Reveal-line text** | per-line masked reveal via spans + overflow hidden | 16 files |
| P3 | **Gold-shine on headings** | same shimmer as H3, applied to h1 + ≤2 h2 per page; composed with reveal-up animation | 16 files |
| P4 | **Parallax scroll** | GSAP ScrollTrigger scrub on images/sections | 7 files (index 9, galeria 3, cursos 3…) |
| P5 | **Zoom images on scroll** | scale scrub in gallery/courses | galeria, cursos/[slug] |
| P6 | **Clip-path reveals** | nosotros timeline (4 refs), index | 2 files |
| P7 | **Stagger fade-up lists** | class-based stagger 45ms (search results) | Search.astro |
| P8 | **accordion FAQ** | native `<details>` + ease-respuesta transitions | faq |
| P9 | **Filter without reload** | FilterEngine over gallery sequence | galeria |

### 2.4 Search (Search.astro / pagefind-client.js)

| # | Effect | Technique | Status |
|---|---|---|---|
| S1 | **Command-palette overlay** | dialog + glass panel (backdrop blur 16px, bg 0.985 alpha), dark radial overlay (blur 10px) | active |
| S2 | **Keyboard nav** | ↑/↓ select, Enter open, Esc close, Ctrl+K/⌘K global, Tab trap | active |
| S3 | **Stagger result fade-up** | 45ms class stagger | active |
| S4 | **Term highlight** | `<mark>` gold wash 0.42 alpha + ink text | active |
| S5 | **Result counter** | "showing 10 of 19" | active |
| S6 | **Suggestion chips** | 7 quick links always visible on empty state | active |
| S7 | **Dev fallback** | `available()` probe → elegant degradation | active |
| S8 | **no-scroll lock** | CSP-safe `.no-scroll` class (not inline style) | active |

### 2.5 Modal video (VideoModal.astro)

| # | Effect | Technique | Status |
|---|---|---|---|
| V1 | **Modal open/close** | GSAP fade + ancestor-transform cleanup (`clearProps`) for fixed-position correctness | active |
| V2 | **Scroll lock** | `.no-scroll` class CSP-safe | active |
| V3 | **YouTube embed** | `youtube-nocookie` iframe | active |

### 2.6 Micro-interactions & accessibility

| # | Effect | Technique | Status |
|---|---|---|---|
| M1 | **prefers-reduced-motion** | enforced in 21 files — all effects degrade to static | active |
| M2 | **hover/focus states** | CSS transitions (ease-respuesta), jade/oro accents | 17 files |
| M3 | **Print cleanup** | effects disabled in print | active |

---

## 3. Current Performance Baseline (Lighthouse prod, pre-this-round)

| Metric | Value | Target |
|---|---|---|
| Performance | 92 | ≥95 |
| LCP | 2.6s | ≤2.5s |
| TBT | 140ms | ≤200ms |
| CLS | 0 | <0.1 |
| A11y | 100 | 100 |
| SEO | 100 | 100 |

---

## 4. Open Questions for Deep-Research Agent

Analyze the inventory above against 2026 cutting-edge / leading-edge / bleeding-edge
techniques **compatible with this exact stack** (Astro 7, Tailwind v4/Oxide, GSAP+Lenis,
Pagefind, Cloudflare). Prioritize by (impact × compatibility ÷ risk):

1. **Typography**: current fonts (Playfair/Geist/JetBrains) are visually standard.
   Candidates researched: Zen Old Mincho, Shippori Mincho, Noto Serif JP (all OFL) —
   which pairing best carries Japanese-mincho heritage while preserving the
   Latin editorial voice and 70/25/5 hierarchy? Font-loading strategy for CJK subsets
   (subsetting, font-display, preload) that keeps LCP ≤2.5s?
2. **Scroll-driven animations**: CSS `animation-timeline: view()/scroll()` (84–90%
   support) replacing GSAP reveals on content pages — which effects migrate, which stay GSAP?
3. **View Transitions API**: cross-document transitions between gallery↔work,
   courses↔course — native Astro support; expected UX lift vs. cost?
4. **WebGPU / R3F**: 2–3 hero artworks in real WebGL (doc. 8 §22.2 allows R3F for in-scene,
   `<model-viewer>` for isolated 3D) — worth it for this content type?
5. **Main-thread optimization**: which remaining GSAP/ScrollTrigger callbacks can be
   `ScrollTrigger.config({limitCallbacks:true})`, `client:visible` islands, `content-visibility:auto`?
6. **Marquee/shimmer**: any Web Animations API (WAAPI) advantage over current CSS keyframes?
7. **Micro-interactions missing**: what premium 2026 details (cursor effects, page
   transitions, magnetic 2.0, text hover effects, tilt cards) fit the brand without
   violating the "one accent per view" rule?
8. **Accessibility**: WCAG 2.2 AA + ISO 40500:2025 declaration page exists — any
   effect risks (motion triggers, contrast in shimmer gradients at 4.5:1)?
9. **Performance ceiling**: what single change moves Performance 92→98 without
   sacrificing the brand's motion identity?

---
*Generated by Orchestrator · ArteMichiko · 2026-08-14 · source: src/ audit (26 files)*
