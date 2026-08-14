# Prompt para Open Design — Variantes de Home ArteMichiko

> Pega este prompt en Open Design (http://127.0.0.1:35359), selecciona OpenCode como motor,
> y pide las variantes. Ajusta lo que necesites. Basado en MAESTRO E.35/E.38.

---

## BRIEF DE DISEÑO — Home de ArteMichiko

**Cliente**: ArteMichiko — Centro Cultural Académico de Dibujo y Pintura Artística (CDMX).
Academia de arte con sistema Oriental único en México (raíces chinas y japonesas).

**Objetivo**: Home memorable a nivel Awwwards. Que se vea premium, curado por humanos,
NUNCA como plantilla de IA. Transmitir elegancia y serenidad.

### Identidad visual (NO negociable)
- **Paleta**: blanco marfil `#FDFBF7` (fondo), negro profundo `#11110E` (texto/estructura),
  **dorado metálico `#D4AF37`** (joyas: CTA, títulos, hairlines — NUNCA `#FFD700` plano,
  usar gradiente foil 3 stops `#7D5A30→#C8A84B→#FFF4C7` a 45°), y **poco jade `#00A86B`**
  (acento secundario cultural: éxito, hover, detalles de obra, sello de autor).
- **Proporción**: 70% blanco / 25% negro / 5% dorado+jade (oro ~2/3, jade ~1/3).
- **Tipografía**: serif display de alto contraste (Playfair Display / Didot / Bodoni)
  SOLO en títulos y display; sans humanista limpia (Geist / Satoshi) para cuerpo y UI;
  mono (JetBrains Mono) para metadata técnica de obra. NUNCA serif en navegación/formularios.
- **Texturas**: grano de papel fino (noise 0.03-0.05), trazos de pincel SVG como acentos,
  enmarcado de obra con hairline de tinta.

### Secciones de la Home (en orden)
1. **Hero "El arte como estado del alma"** — statement grande en serif (frase: "El arte como
   estado del alma" con "estado del alma" en dorado), subtítulo con el sistema Oriental,
   dos CTAs (oro = explorar cursos, borde = ver galería). Sensación de galería de museo,
   espacio negativo amplio.
2. **Video Canal 11** — "En los medios": card con thumbnail del video (D Todo, Canal Once)
   + play ▶ (click-to-play), atribución "Canal Once · 2024". Prueba de autoridad.
3. **Tres pilares de la academia** — técnicas (dibujo, pintura, grabado) presentadas como
   piezas de galería numeradas (01/02/03), estilo editorial.
4. **Galería destacada** — 3-4 obras con hover premium (línea jade/dorada), metadata mono.
5. **Comunidad / Prueba social** — "Visita nuestras redes" con embeds o cards de
   Instagram/Facebook/YouTube/TikTok + video de alumnos.
6. **CTA final / Matriculación** — "Empieza tu camino artístico" con botón dorado
   que lleva a WhatsApp. NOTA: sin tienda, sin base de datos — solo conversación.

### Reglas de elegancia (Awwwards 2026)
- Restraint: menos es más. Una idea por pantalla. Coherencia > cantidad.
- Motion con propósito: preloader de marca corto (1.5-2.5s), micro-interacciones sutiles.
- Responsive impecable: móvil + desktop (juzgado en ambos).
- NADA de: gradientes púrpura/azul, glassmorphism excesivo, emojis, Inter/Roboto,
  iconos Lucide/FontAwesome, scroll-reveal genérico, sombras difusas grandes.

### Entregables
Genera 3 variantes de la Home en HTML (una por dirección):
- **Variante A — "Editorial Oro"**: serif dominante, mucho aire, dorado como joya única.
- **Variante B — "Galería Jade"**: más oscura, negro profundo como base, jade como
  acento secundario visible, sensación de museo nocturno.
- **Variante C — "Wabi-sabi Minimal"**: blanco casi puro, asimetría deliberada,
  texturas de papel, trazos de tinta como firmas.

Cada variante: HTML autocontenido con CSS inline, responsive, sin dependencias externas.
