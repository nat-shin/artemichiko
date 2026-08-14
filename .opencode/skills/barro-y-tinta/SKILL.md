---
name: barro-y-tinta
description: Sistema de diseño ArteMichiko — identidad "Barro y Tinta" elevada a lujo: BLANCO + NEGRO + DORADO (oro metálico brillante). Elegancia de academia de arte: serif display de alto contraste, espacio negativo amplio (Ma), trazo de tinta como acento, oro como única joya. Aplicar en TODA pieza de UI o contenido. Prohíbe variaciones fuera de marca.
license: Propietario — ArteMichiko
---

# Barro y Tinta — Sistema de Diseño ArteMichiko (Edición Oro)

> Academia de arte · CDMX · **Dirección: ELEGANCIA.** Blanco (lienzo puro) + Negro (tinta profunda) + **Oro metálico brillante** (la joya única).

## Principios (no negociables)

1. **Lienzo, Tinta y Oro.** Fondo = blanco marfil puro. Estructura = negro profundo. El oro es la ÚNICA joya — un acento, una perla, nunca relleno.
2. **Restraint es lujo** (Awwwards 2026). Menos es más: coherencia > cantidad. "La tipografía comunica el precio antes que el copy."
3. **Espacio negativo como poder** (間 Ma). Whitespace generoso e intencional: si quitar algo mejora el diseño, se quita.
4. **Oro con disciplina**: cobertura 5–15% de la superficie. Oro metálico (foil/gradiente sutil), NUNCA amarillo plano `#FFD700` (neón = barato).
5. **Imperfección deliberada** (wabi-sabi): asimetría sutil, textura de grano fino, trazo de pincel visible — como firma de artista, no como error.
6. **Un sello, una voz**: el detalle rojo cinabrio (印章) queda SOLO para firma de artista/obra — no compite con el oro.
7. **Proporción 70/25/5**: blanco 70%, negro 25%, dorado+jade 5% (oro ~2/3, jade ~1/3). Jade = acento secundario: éxito, hover secundario, detalles de obra, metadata. Nunca ambos a plena intensidad juntos (el jade enfría el calor del oro).

## Paleta (tokens oficiales)

| Token | Valor | Uso |
|---|---|---|
| `lienzo-blanco` | `#FDFBF7` | Fondo principal (marfil puro) |
| `lienzo-hueso` | `#F5F0E6` | Fondos secundarios, tarjetas |
| `tinta-negra` | `#111111` | Texto principal, estructura (nunca `#000` puro) |
| `tinta-grafito` | `#4A4A46` | Texto secundario, metadata |
| `tinta-humo` | `#9A968C` | Líneas divisorias, estados inactivos |
| `oro-brillo` | `#D4AF37` | **Joyas**: CTA primario, títulos destacados, bordes finos de lujo |
| `oro-champagne` | `#C69B3C` | Hover, acentos secundarios, foil sutil |
| `oro-arenoso` | `#EBDAB0` | Neutro cálido, fondos de sección especial |
| `sello-cinabrio` | `#C3272B` | SOLO firma de artista/obra (印章) |
| `jade-base` | `#00A86B` | **Acento secundario** (después del oro): éxito, hover secundario, detalles de obra, iconos de metadata |
| `jade-profundo` | `#00965F` | Texto jade sobre claro (AA-lg 3.8:1), subrayados, bordes de foco |
| `jade-tinta` | `#00452C` | Texto jade sobre claro (AA 11.1:1), sellos |
| `jade-claro` | `#00E08F` | Texto jade sobre negro (AA 11.4:1), gradientes jade |
| `jade-lechoso` | `#8BBBA6` | "Jade chino" lavado, fondos sutiles, bordes sobre oscuro |

## Tipografía (jerarquía couture)

- **Display/Títulos**: serif display de ALTO contraste (estilo editorial de revista / alta costura) — la tipografía ES el lujo.
- **Texto/UI**: sans humanista legible; español (MX) con acentos correctos.
- **Metadata técnica de obra**: monoespaciada (voz CATÁLOGO — doc 6).
- **Regla**: titulares grandes y confiados (oversized typography), jerarquía exagerada, una sola voz tipográfica por sección.

## Tratamiento del oro

- **Foil metálico**: gradiente dorado sutil en títulos destacados o líneas (`linear-gradient` de `#D4AF37` → `#C69B3C` → `#EBDAB0`), no flat color.
- **Líneas de lujo**: hairline (1px) doradas como divisores de sección o marcos de obra.
- **Nunca**: relleno dorado de fondos, texto dorado sobre blanco sin contraste suficiente (WCAG: usar oro oscuro `#A67C00` para texto sobre blanco, o asegurar ratio AA).

## Texturas y tratamiento

- Grano fino (noise `opacity 0.03-0.05`) sobre fondos blancos — textura de papel de arte, sutil.
- Imágenes de obra: enmarcadas con hairline de tinta, como piezas de galería de museo.
- Trazo de pincel (SVG) como acento decorativo en títulos — el "tinta" de la identidad.
- Nunca: glassmorphism, gradientes de software, sombras difusas grandes, neón.

## Vocabulario de trazo

- **Pincelada = acento**: subrayado de título, divisor de sección (tinta negra o dorada).
- **Línea negra = estructura**: bordes, grillas, tablas.
- **Línea dorada = celebración**: CTAs, premiación, obras destacadas, footer de lujo.
- **Sello rojo = firma**: logo de artista/obra, única aparición de cinabrio.

## Anti-patrones (prohibido)

- `#FFD700` plano · Gradientes de software genéricos · Glassmorphism · Sombras grandes difusas · Paletas SaaS (azul/índigo) · Emojis decorativos · Look de plantilla AI · Oro como fondo relleno · Texto en imágenes sin fallback · Inter/Roboto/Arial.

## Aplicación

- Toda página nueva: consultar esta skill + `artemichiko-elegance` (lujo) + `estetica-asia` (Ma/wabi-sabi) + `theme-factory` para variantes.
- Toda pieza de marca: `brand-guidelines` + esta.
- QA de lujo antes de entregar: `impeccable` (`/polish`).
- Respetar `prefers-reduced-motion`.
