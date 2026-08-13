---
name: barro-y-tinta
description: Sistema de diseño ArteMichiko — identidad "Barro y Tinta". Barro (tierra, arcilla, texturas artesanales, calor) + Tinta (trazo, tinta china, negro/gris, precisión). Aplicar en TODA pieza de UI, página, componente o contenido visual del sitio. Prohíbe variaciones fuera de marca.
license: Propietario — ArteMichiko
---

# Barro y Tinta — Sistema de Diseño ArteMichiko

> Academia de arte · CDMX · Identidad: **Barro** (materia, artesanía, tierra) + **Tinta** (trazo, precisión, expresión).

## Principios (no negociables)

1. **Barro es cuerpo, Tinta es alma.** Fondo/espacio = tierra, arcilla, textura cálida. Acento/estructura = trazo negro nítido sobre ese fondo.
2. **Materialidad visible.** Texturas de arcilla, papel artesanal, fibra — nunca gradientes genéricos de software.
3. **Espacio negativo como poder** (間 Ma). Whitespace intencional: si quitar un elemento hace que el diseño gane, se quita.
4. **Imperfección deliberada** (wabi-sabi). Asimetría sutil, bordes no perfectos, pincelada visible — como firma, no como error.
5. **Un acento, una voz.** El rojo cinabrio (sello 印章) es el ÚNICO acento cálido de la marca — para firma, sello, CTA primario.

## Paleta (tokens)

| Token | Valor | Uso |
|---|---|---|
| `barro-arcilla` | `#C4703F` | Terracota principal — acentos, hover |
| `barro-tierra` | `#8A5A33` | Textura, fondos secundarios |
| `barro-arena` | `#E8D9C3` | Fondo principal cálido |
| `barro-paja` | `#F5ECDD` | Fondo claro, tarjetas |
| `tinta-negra` | `#1A1A18` | Texto principal, estructura, trazo |
| `tinta-gris` | `#5C5A54` | Texto secundario, metadata |
| `tinta-hielo` | `#B8B4A8` | Líneas divisorias, estados inactivos |
| `sello-cinabrio` | `#C3272B` | Sello 印章, firma, CTA primario — único acento cálido |

## Tipografía

- **Display/Títulos**: trazo editorial fuerte (serif display o letra con carácter de pincel).
- **Texto/UI**: humanista legible; en español (MX) con acentos correctos.
- **Metadata técnica de obra**: monoespaciada (voz CATÁLOGO — doc 6).
- CJK (si aparece): reglas de longitud de título de la tradición china — títulos cortos, densidad controlada.

## Texturas y tratamiento

- Fondos: arcilla granulada, papel artesanal (washi), fibra — generadas con CSS/SVG sutil, nunca fotos stock.
- Imágenes de obra: enmarcadas con línea de tinta fina, como piezas en galería.
- Nunca: glassmorphism, gradientes neón, sombras difusas de software.

## Vocabulario de trazo

- **Pincelada = acento**: el trazo negro aparece como elemento decorativo (subrayado de título, divisor de sección, marco).
- **Línea negra = estructura**: bordes, tablas, grillas usan `tinta-negra` con trazo de 1-2px.
- **Sello rojo = firma**: el logo o firma del artista se sella en cinabrio, como estampa.

## Anti-patrones (prohibido)

- Gradientes de software genéricos · Glassmorphism · Sombras grandes difusas · Paletas de SaaS (azul/índigo) · Emojis como decoración · Plantillas "look de AI" · Texto en imágenes sin fallback.

## Aplicación

- Toda página nueva: consultar esta skill + `theme-factory` para variantes (Tierra Cocida, Tinta Seca, Washi, Sello).
- Toda pieza de marca: `brand-guidelines` + esta.
- Respetar `prefers-reduced-motion` en animaciones de tinta/trazo.
