# Investigación — Efectos de animación adicionales 2026 (páginas de contenido ArteMichiko)

> Stack: Astro 7 + GSAP + Lenis + Motion. Sitio ya tiene: Lenis, header direction-aware, preloader contador, text reveal por líneas, sticky zoom-parallax, mask reveal, parallax interno, marquee, cursor follower, fade-ups.
> Búsqueda dual firecrawl_search + tavily_search por tema. Motor indicado por hallazgo.

---

## Tabla de técnicas nuevas (14)

| # | Técnica | Qué hace | Snippet conceptual | Dónde en ArteMichiko | Prioridad | Fuente (motor) |
|---|---|---|---|---|---|---|
| 1 | **View Transitions obra→ficha** | La imagen de la obra "vuela" del grid a la ficha (`transition:name`). Navegación MPA con sensación SPA | `galeria.astro`: `<img transition:name={"obra-"+slug}>` · `obra.astro`: mismo name en la imagen hero · `<ClientRouter fallback="swap" />` + `transition:animate="slide"` en main · `transition:persist` en header | Galería (grid→ficha), cursos→ficha de curso | **ALTA** | firecrawl: docs.astro.build, codrops 2023; tavily: developer.chrome.com/blog/astro-view-transitions |
| 2 | **Hover obra: grayscale→color + zoom lento** | Obra reposa ligeramente desaturada; al hover recupera color y zoom suave (0.7s, cubic-bezier suave). Señal de "curaduría" | `.obra img { filter: grayscale(.35); transition: transform .7s cubic-bezier(.22,1,.36,1), filter .7s; } .obra:hover img { transform: scale(1.06); filter: grayscale(0); }` + caption slide-up | Grid galería, Tienda de Arte | **ALTA** (CSS puro, cero JS) | tavily: w3bits, penpot.app; firecrawl: veebilehed24.ee |
| 3 | **3D tilt sutil de tarjeta** | Tarjeta de obra se "levanta" (rotateX/rotateY 2-3° + scale 1.04) guiada por cursor, perspective 900px | CSS: `.obra { perspective: 900px }` + GSAP `quickTo` a `rotationX/rotationY` con offset del cursor (max ±3°) | Galería (desktop), cards de curso | MEDIA | tavily: w3bits.com/blog/css-image-hover-zoom |
| 4 | **SplitText mask reveal responsive** | Títulos H2 que emergen detrás de máscara por líneas, con `autoSplit` (re-split en resize). Variante robusta del text reveal ya existente | `SplitText.create("h2[data-split]", { type: "lines", autoSplit: true, onSplit(self) { return gsap.from(self.lines, { yPercent: 110, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power4.out" }); } })` + `overflow:hidden` en contenedor | H2 de Cursos, Nosotros, Docentes, FAQ | **ALTA** | firecrawl: gsap.com/docs SplitText; tavily: lab.good-fella.com/gsap-text-animation-splittext-guide |
| 5 | **Stagger genérico `[data-reveal]`** | Sistema declarativo: cualquier lista/grid aparece con stagger al entrar en viewport. Un solo helper para todo el sitio | `gsap.from("[data-reveal] > *", { y: 24, autoAlpha: 0, duration: .7, ease: "power3.out", stagger: { each: .06, from: "start" }, scrollTrigger: { trigger: "[data-reveal]", start: "top 80%", once: true } })` | Listas de docentes, testimonios, FAQ, catálogo cursos | **ALTA** | firecrawl: gsap.com/resources Staggers; tavily: gsap forums #24288 |
| 6 | **FAQ accordion GSAP** | Acordeón con altura `auto` real (sin altura fija), un solo panel abierto, easing premium. Patrón "play/reverse" de tween persistente | `gsap.set(panel, {height:"auto"}); const t = gsap.from(panel, {height:0, duration:.5, ease:"power4.inOut"}).reversed(true);` click → cerrar otros con `.reversed(true)`, toggle del actual | FAQ page (Parte 19.15 del strategy) | **ALTA** | firecrawl: blog.itskay.co/accordion; tavily: gsap forums accordion |
| 7 | **Counter odometer** | Números que cuentan al entrar en viewport (años, alumnos, obras). Odometer con dígitos rodando = variante premium | `gsap.from(el, { textContent: 0, duration: 2, ease: "power2.out", snap: { textContent: 1 }, scrollTrigger: { trigger: ".stats", start: "top 80%", once: true } })` + format `toLocaleString("es-MX")` | Stats en Nosotros, Contacto, sección "35+ años" | **ALTA** | firecrawl: gsap forums #32416; tavily: gsapify.com (odometer + count-up) |
| 8 | **Scroll progress de lectura** | Línea/porcentaje de progreso para artículos largos (blog). Vertical lateral o top bar; con Lenis funciona directo | `gsap.timeline({ scrollTrigger: { start: 0, end: "max", scrub: .3 } }).to(".progreso", { scaleY: 1, ease: "none" })` + `onUpdate` para % texto | Blog/Revista (Pilar 1-3), páginas de curso largas | MEDIA | firecrawl: uxdesign.cc, onepagelove.com; tavily: webflow university |
| 9 | **Scrub titles editoriales** | Título que se arma con el scroll (scrub), palabras opacas→visibles. Ritmo editorial, no trigger | `gsap.from(".titulo-scrub .word", { yPercent: 100, opacity: .2, stagger: .05, scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: .5 } })` | Aperturas de sección en Blog y Nosotros | MEDIA | tavily: lab.good-fella.com SplitText guide (scroll-scrub) |
| 10 | **Lista de cursos: stack expansion** | Lista compacta apilada (cards rotadas ±) que se expande en cards completas al scroll (sticky + clip-path + scrub) | `gsap.timeline({ scrollTrigger: { trigger: ".cursos", pin: true, start: "top top", end: "+=200%", scrub: 1 } }).to(".curso", { y: -30, rotate: 0, stagger: .1 }).to(".curso .inner", { clipPath: "inset(0 0 0% 0)" }, 0)` | Catálogo de cursos (mobile-first), lista de programas | MEDIA | tavily: freefrontend.com gsap-scrolltrigger-list-expansion-2026 |
| 11 | **Border draw en hover** | Borde que se "dibuja" al hover: 4 esquinas (dots) aparecen y 4 líneas se dibujan en secuencia (scaleX/scaleY con delays). Sensación trazo/pincel — perfecto para la marca | CSS puro con `:has()` + `@keyframes` por lado (delay .8s/1.4s/2s/2.4s) — snippet completo en freefrontend | CTA terciarios, tarjetas de curso, botones "Explorar" | MEDIA | firecrawl: freefrontend.com/css-border-animations (2026-03-12); tavily: freefrontend |
| 12 | **Gradient border @property --angle** | Borde dorado giratorio sutil en cards premium, con `conic-gradient` + `@property` registrado (animable) | `@property --ang { syntax:"<angle>"; initial-value:0deg; inherits:false }` · `border: 1px solid transparent; background: linear-gradient(#f6f1e7,#f6f1e7) padding-box, conic-gradient(from var(--ang), dorado, transparent 40%, dorado) border-box;` hover → animar `--ang` | Cards destacadas (curso insignia, obra hero), sin abusar | MEDIA | tavily: web.dev/articles/css-border-animations, ibelick.com |
| 13 | **Magnetic CTA** | Botón se atrae al cursor (offset 30-40%, release con elastic). `gsap.quickTo` = 60fps sin re-crear tweens | `const xTo = gsap.quickTo(btn, "x", {duration:.6, ease:"power3.out"}); const yTo = gsap.quickTo(btn, "y", {duration:.6, ease:"power3.out"});` mousemove → `xTo((e.clientX-cx)*.35); yTo((e.clientY-cy)*.35);` leave → `xTo(0); yTo(0)` | CTA matriculación, botón WhatsApp, "Explorar la colección" | **ALTA** | firecrawl: blog.olivierlarose.com/magnetic-button, gsap forums; tavily: lab.good-fella.com/gsap-hover-effects |
| 14 | **RGB split hover** | Canales RGB de la imagen se desplazan al hover (glitch cromático). Impacto alto, pero colisiona con la calma de "Barro y Tinta" | `filter` + 3 capas duplicadas con `mix-blend-mode: screen` desplazadas | **Descartar** para galería (rompe paleta); nota: mantener solo si hay campaña/pieza experimental | BAJA | tavily: veebilehed24.ee (efecto #10) |

---

## Top 8 para implementar AHORA

| # | Técnica | Por qué | Esfuerzo |
|---|---|---|---|
| 1 | View Transitions obra→ficha | Diferenciador inmediato de "premium"; MPA real con animación de navegación; ya en stack (Astro nativo) | Bajo-medio (día) |
| 2 | Hover obra grayscale→color + zoom | Cero JS, CSS puro, máxima relación impacto/costo en la página ancla | Muy bajo |
| 3 | FAQ accordion GSAP | Página FAQ es prioridad GEO (#5 acciones de apalancamiento); altura auto sin saltos | Bajo |
| 4 | Stagger genérico `[data-reveal]` | Un helper cubre docentes, testimonios, cursos, FAQ — consistencia de sistema, no efectos sueltos | Bajo |
| 5 | Counter stats (años/alumnos/obras) | "35+ años" + obra real = datos concretos, no adjetivos (regla GEO del strategy) | Bajo |
| 6 | Magnetic CTA matriculación | El único punto de conversión merece la microinteracción más premium; quickTo barato | Bajo |
| 7 | SplitText mask reveal en H2 | Extiende el sistema tipográfico del hero a todas las páginas de contenido; autoSplit lo hace responsive-proof | Bajo-medio |
| 8 | Scroll progress blog | Solo para artículos largos; refuerza "lectura guiada" del Pilar 3 | Bajo |

**Orden sugerido:** 2 → 3/4 (mismo commit) → 1 → 6 → 5 → 7 → 8.

**Reglas transversales (ya del sistema de diseño, reafirmadas por fuentes):**
- `prefers-reduced-motion` desactiva todo sin excepción (web.dev + gsap docs lo exigen).
- GSAP durations con ScrollTrigger se convierten en distancia — ajustar `end` cuando un stagger se siente brusco (foro GSAP #44014).
- Stagger en hover: no usar `elastic` en mousemove continuo; `power3.out` máximo (lab.good-fella).
- RGB split y gradient border giratorio: NO en la misma vista (regla "un acento por vista").
