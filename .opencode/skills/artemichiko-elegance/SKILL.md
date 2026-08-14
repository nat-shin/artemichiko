---
name: artemichiko-elegance
description: Skill de lujo para ArteMichiko — produce interfaces que transmiten ELEGANCIA premium: blanco marfil + negro profundo + oro metálico brillante como única joya. Basada en arquetipo Editorial Luxury (high-end-visual-design), restraint Awwwards 2026 y quiet luxury. Úsala al crear CUALQUIER página o componente del sitio para que todo se sienta como galería de alta gama, nunca como template de AI.
license: Propietario — ArteMichiko
---

# Artemichiko Elegance — Lujo Editorial para la Academia

> Objetivo: que ArteMichiko se sienta como una **galería de arte de alta gama con mecenazgo**, no como un template. La elegancia no se añade — se logra restando.

## El arquetipo: Editorial Luxury

Referencia mental: doble-página de revista de arte + vitrina de galería. Cada sección del sitio es una **pieza de página**: masthead fuerte, jerarquía tipográfica exagerada, espacios negativos amplios, numeración de sección (01, 02, 03…), piezas de página sutiles.

## Las 7 reglas del lujo (no negociables)

1. **Restraint** — el diseño más caro es el que menos tiene. Una idea por pantalla. Coherencia > cantidad. (Awwwards 2026: "los trends son condimento, no plato principal").
2. **Tipografía = precio** — serif display de alto contraste para títulos (estilo Vanity Fair / couture). La tipografía comunica el valor ANTES que el contenido.
3. **Oro con disciplina** — el dorado (`#D4AF37` metálico, gradiente) es UNA joya por vista: CTA primario o título destacado o hairline divisoria. 5–15% cobertura. NUNCA relleno, NUNCA `#FFD700` plano.
4. **Negro profundo, no puro** — `#111111`, nunca `#000`. Da profundidad sin dureza.
5. **Espacio como poder** — padding mínimo 6rem en desktop; el vacío hace "caro". Si quitar mejora, se quita.
6. **Motion con propósito** — springs custom, easing `cubic-bezier` propio, transiciones que no llaman la atención. NUNCA scroll-reveal genérico, NUNCA `ease-in-out` default. GPU-safe (`transform`/`opacity` only).
7. **Grano fino** — textura de papel (noise 0.03-0.05) sobre blancos; hace que el minimalismo se sienta material, no vacío.
8. **Jade como segunda joya (poco)** — el verde jade chino (#00A86B, o #00965F para texto) aparece solo en: éxito/success, hover secundario, detalles de obra, metadata de catálogo, y el sello de autor. Proporción 70/25/5 (oro ~2/3 del 5%, jade ~1/3). Nunca jade y oro a plena intensidad juntos. El jade es la capa CULTURAL (serenidad, sabiduría, herencia asiática); el oro es la capa de ESTATUS (maestría).

## Anti-patrones (matan el lujo)

| Prohibido | Reemplazo |
|---|---|
| `#FFD700` amarillo plano | Oro metálico `#D4AF37`→`#C69B3C` gradiente |
| Inter / Roboto / Arial | Serif display alto contraste + sans humanista |
| Sombras difusas grandes | Hairlines (1px) y espaciado |
| `ease-in-out` default | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out expo) |
| Scroll-reveal genérico | Reveals por opacidad/trazo, con stagger sutil |
| Iconos Lucide/FontAwesome | Líneas ultra-finas (estilo Phosphor Light) o SVG propio |
| Gradientes de software | Foil dorado sutil o nada |
| Glassmorphism | Superficies sólidas con grano |
| Densidad de SaaS | Whitespace generoso |

## Composición (patrón galería)

1. **Masthead**: wordmark "ArteMichiko" en serif + sello; nav en sans, espaciada.
2. **Hero**: título serif oversized sobre blanco marfil; hairline dorada; trazo de tinta SVG; una obra destacada enmarcada.
3. **Secciones numeradas** (01 Fundamento · 02 Obra · 03 Maestría): doble-página de revista.
4. **Galeria**: cada obra sobre blanco, hairline de tinta, hover con línea dorada; metadata monoespaciada.
5. **CTA**: botón de oro metálico (foil) — único elemento brillante de la vista.
6. **Footer**: negro profundo, texto grafito, línea dorada superior — cierre de lujo.

## Flujo de trabajo

1. Consultar `barro-y-tinta` (tokens) + `estetica-asia` (Ma/wabi-sabi) primero.
2. Diseñar con esta skill como lente de lujo.
3. QA final: `impeccable` (`/polish`) + `web-design-guidelines` (accesibilidad del oro: sobre blanco usar oro oscuro `#A67C00` o asegurar ratio AA).

## Referencias de lujo 2026

- By-Kin (editorial restraint, smooth-scroll con peso)
- The Renaissance Edition (Awwwards SOTM feb-2026 — academia de arte + tech)
- Brunello Cucinelli AI (makemepulse — lujo artesanal que vende)
- ETQ (minimalismo premium: flat backgrounds, tipografía fuerte)
