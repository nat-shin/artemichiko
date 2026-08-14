# ArteMichiko — Investigación: Skills de Diseño Europeos (blanco + negro + dorado, elegancia)

> 2026-08-13 · Fuentes: firecrawl + tavily (ambos). Objetivo: skills AI de escuelas de diseño europeas
> aplicables a una academia de arte con dirección **blanco/negro/dorado brillante + elegancia**.

---

## 1. Hallazgos por escuela de diseño

### 🇨🇭 Suizo / International Typographic Style
- **zeke/swiss-design-skill** — sistema de diseño Swiss International Style para agentes AI: tipografía grotesca
  (IBM Plex Sans, fallbacks Hanken Grotesk/Barlow/Host Grotesk), grid 12 columnas base 8px, whitespace
  estructurado (`py-24` mínimo), jerarquía por opacidad (no por hue), **un solo acento** — por defecto
  Swiss Red `#C8102E`, pero documenta "swap to cobalt, **golden**, or forest per project". Referencias de
  Josef Mueller-Brockmann y las escuelas de Zúrich y Basilea. MIT, ~132★.
  Fuente: github.com/zeke/swiss-design-skill; hongkiat.com/blog/ai-skills-coding-agent-design; mcpmarket.com
- **awesomeskill swiss-typography** — grids rígidos, contraste de escala tipográfica extremo; pero sesgado
  a "blueprints desclasificados" / terminal militar: útil en la forma, no en la elegancia.
  Fuente: awesomeskill.ai/tag/swiss-typography
- **guizang-ppt-skill** (op7418, 20.8k★) — decks HTML editoriales con layouts de revista y tipografía Swiss
  grid; "reads as a crafted artifact". AGPL-3.0.
  Fuente: open-design.ai/blog/guizang-ppt-skill
- Principio (International Typographic Style in Web Design, Medium): reducción, grids matemáticos,
  whitespace como estructura, tipografía como voz principal.

### 🇫🇷 París / alta costura / elegancia francesa
- No existe aún un "Parisian luxury skill" publicado; la estética viene de la filosofía couture:
  - **Craftsmanship Amplification Model** (LVMH/Chanel): AI = "creative accelerator", el humano curta.
    Chanel usa AI interno (tejidos), el ojo editorial queda humano. Fuente: stytrix.com; tesi.luiss.it
  - **Haute couture = "arte para vestir"**: Worth fundó la maison en París (1858), Dior = la "edad de oro"
    (siluetas Tulip/A-line), Balenciaga. Fuente: Google Arts & Culture (Kyoto Costume Institute)
  - AI generando colecciones en Paris Fashion Week: AI da amplitud, humanos profundidad.
    Fuente: resident.com; medium.com/google-cloud (fashion multi-agent)
- Aplicación práctica: tipografía serif de alto contraste tipo Didot/Cormorant, reglas finas doradas,
  interletraje amplio, layouts asimétricos "couture", exclusividad por artesanía.

### 🇳🇴 Nórdico / Escandinavo
- **holger1411/minimal-design-system-skill** — sistema **blanco y negro minimalista** con whitespace
  generoso, Tailwind + Inter, light/dark auto, MIT (~7★). Prácticamente la base cromática pedida.
  Fuente: github.com/holger1411/minimal-design-system-skill
- **TypeUI Minimal** — "cada elemento debe justificar su existencia"; ideal para sitios de autor.
  Fuente: typeui.sh/design-skills/minimal
- Estética nórdica en imagen: línea/line-art, mucho negativo, paleta neutra, luz natural (Wallnora:
  line art brilla en interiores Scandinavian/Japandi).
- Principio: funcionalismo, luz, reducción, calidez ("hygge") con contención.

### 🇮🇹 Italiano / lujo
- "Design and industry: lessons from the Italian design system" (Politecnico di Milano, DPPI'11):
  Made in Italy = síntesis de **función + belleza**, diseño como conocimiento tácito colectivo,
  "el diseñador como nuevo intelectual moderno", herencia del **disegno renacentista** (Leonardo: dibujo =
  planificación estratégica + storytelling técnico).
  Fuente: profesorvargasguillen.files.wordpress.com PDF; youtube.com (The Italian Way)
- Istituto Marangoni: curso "AI-Enhanced Luxury Interior Design" (Milano Design Week) — AI para
  traducir identidad de marca en diseño de lujo. Fuente: istitutomarangoni.com
- Renacimiento: proporción dorada, armonía, mecenazgo Medici (patrocinio de las artes — lección directa
  para una academia). Brera lamp de Castiglioni = el objeto suspendido que "pregunta".

### 🇺🇸 Design systems (Vercel/Anthropic — americanos, estética aplicable)
- **anthropics/skills · frontend-design** (~65-148k★) — fuerza un "BOLD aesthetic direction"
  (editorial, brutalist, **luxury/refined**, art deco/geometric...) antes de escribir código; anti
  "AI slop". Para refinado/minimal: "restraint, precision, careful attention to spacing, typography".
  Fuente: agenticskills.io/skills/frontend-design; snyk.io; github.com/anthropics/skills
- **vercel-labs/agent-skills · web-design-guidelines** (~19-27k★) — auditoría de UI con 100+ reglas
  (layout, tipografía, a11y, performance); neutral estéticamente, endurece cualquier look europeo.
- **pbakaus/impeccable** (~3.2k★) — crítica, audit y pulido de frontend; 27 reglas anti-patrón;
  modos `/quieter` `/bolder` `/normalize`; separa brand (editorial/portfolio) vs product.
  Fuente: composio.dev/content/top-design-skills
- **emil-design-eng** (Emil Kowalski, Vercel; ~1.5-7.2k★) — filosofía "taste is trained"; pulido UI,
  framework de decisión de animación (curves/easing/duración). Craft, no estética per se.
  Fuente: emilkowal.ski/skill; ui-skills.com; github.com/emilkowalski/skills

### 🤫 Quiet luxury / old money
- No hay skills; hay **prompts de foto/editorial** (promptplum 33 prompts; media.io 25+): principios =
  calidad primero, restricción, atemporalidad, artesanía sobre logos. "Old money es culturalmente
  específico (anglo-europeo); quiet luxury es universal (calidad y simplicidad pura)".
  Fuente: service.allthatsstylist.com; alfordhomes.com; levtexhome.com
- Paleta: crema, navy, taupe, verde bosque, burdeos, **charcoal** — la familia correcta para una
  academia elegante (no dorado gritón).

### ✨ Gold + black + white elegance (datos duros)
- **Gold luxe**: `#C69B3C`–`#D4AF37` (warm, ligeramente desaturado, imprime bien en foil); **evitar
  `#FFD700`** (neón = barato). Rose gold `#B76E79`; champagne `#EBDAB0`.
  Fuente: zoviz.com/blog/luxury-brand-colors-meanings
- **Uso de oro**: 5–15% del layout (logos, bordes, estados activos); fondos near-black; body text en
  neutros suaves (champagne/gris claro) no blanco puro; metalizado = foil en print, gradientes sutiles
  en digital (flat yellow mata el lujo). Fuente: media.io/color-palette/black-gold-color-palette
- **Negro** = autoridad, atemporalidad, reduce la marca a forma y tipografía (ad de Chanel de 1985
  sigue vigente). Fuente: zoviz.com
- **Art Deco**: "black and gold is iconic" (Kittl); tipografía deco = sans alargada/curvilínea, o con
  detalles inline/drop shadows; texturas metálicas. Fuente: youtube.com Kittl tutorial
- Muzli: "Black, white and a touch of gold" — inspiración de web editorial de lujo (Pal Zileri).
  Fuente: medium.muz.li/black-white-and-a-touch-of-gold

---

## 2. Tabla de skills

| Skill | Escuela | Qué hace | Fuente | B/N/Oro elegancia |
|---|---|---|---|---|
| zeke/swiss-design-skill | Suiza (ITS) | Grid 12-col/8px, grotesca IBM Plex Sans, jerarquía por opacidad, 1 acento (swap → golden) | github.com/zeke/swiss-design-skill | ✅ SÍ (base + cambiar acento a oro) |
| TypeUI Editorial | Suiza/editorial | Sistema editorial revista: tipografía refinada, grid 8pt, near-black `#111111`+white | typeui.sh/design-skills/editorial | ✅ SÍ |
| TypeUI Refined | París/editorial serif | Serif de alto contraste (Playfair Display), lujo de revistas, autoridad | typeui.sh/design-skills/refined | ✅ SÍ (tipografía couture) |
| TypeUI Premium | Tech/Apple | Restraint, "expensive without ornate", 4px base | typeui.sh/design-skills/premium | ◐ PARCIAL (frio tech, no dorado) |
| holger1411/minimal-design-system-skill | Nórdica | Sistema **blanco y negro**, whitespace generoso, Tailwind+Inter | github.com/holger1411/minimal-design-system-skill | ✅ SÍ (paleta exacta) |
| Anthropic canvas-design | Teoría del arte | Filosofía de diseño → póster/arte .pdf/.png "que parezca tomó horas" | anthropics/skills (167k) | ✅ SÍ (pósters/folletos academia) |
| Anthropic frontend-design | General+anti-slop | Fuerza dirección estética (incl. **luxury/refined**, art deco); "elegance comes from executing well" | anthropics/skills (65-148k) | ✅ SÍ (dirección + calidad) |
| leonxlnx high-end-visual-design | Lujo | Interfaces premium agency-grade; bloquea fuentes/layouts genéricos; Creative Variance Engine | awesomeskill.ai/skill/leonxlnx-taste-skill | ✅ SÍ (lujo, anti-genérico) |
| guizang-ppt-skill | Suiza/editorial | Decks HTML con look revista + Swiss grid | open-design.ai (20.8k★) | ✅ SÍ (catálogo/presentaciones) |
| Vercel web-design-guidelines | EUA (rigor) | Auditoría 100+ reglas, a11y, performance | vercel-labs/agent-skills | ◐ NEUTRAL (endurece cualquier estilo) |
| pbakaus/impeccable | General (craft) | Crítica/audit/pulido, `/quieter`, anti-patrones | composio.dev | ◐ NEUTRAL (quality gate) |
| emil-design-eng | Vercel (Kowalski) | Pulido UI + animación "taste is trained" | emilkowal.ski/skill | ◐ NEUTRAL (craft) |
| awesomeskill swiss-typography | Suiza/militar | Grids rígidos, contraste tipográfico extremo | awesomeskill.ai/tag/swiss-typography | ◐ FORMA sí / elegancia no |
| UI/UX Pro Max | General | 50 estilos, 97 paletas, 57 pairings (DB consultable) | nextlevelbuilder | ◐ PARCIAL (buscar estilo lujo) |
| MC Dean Designer Skills (63) | Profesional | 8 plugins de proceso de diseño real | marieclairedean.substack.com | ◐ PARCIAL (proceso) |
| bergside/awesome-design-skills | Directorio | 67 skills (TypeUI registry) | github.com/bergside/awesome-design-skills | ◐ DIRECTORIO |

---

## 3. Las 8 mejores para adoptar/adaptar

1. **zeke/swiss-design-skill** — cimiento (grid + grotesca + whitespace + opacidad). Adaptar: acento gold
   `#C69B3C` en vez de Swiss red. MIT, fácil de leer/editar.
2. **Anthropic canvas-design** — pósters, folletos, certificados, arte de la academia en .pdf/.png.
   "90% visual, 10% texto". Núcleo artístico del proyecto.
3. **TypeUI Refined** — tipografía serif de lujo para la marca; contraste serif/dorado (hebras finas).
4. **TypeUI Editorial** — base web de la academia: grid 8pt, near-black sobre blanco.
5. **leonxlnx high-end-visual-design** — garantiza "visualmente caro", bloquea genérico; lujo real.
6. **Anthropic frontend-design** — dirección estética deliberada (editorial/luxury) antes de codificar;
   anti-slop. Funciona como orquestador de los anteriores.
7. **guizang-ppt-skill** — catálogo de cursos/presentaciones con look editorial revista (ojo AGPL-3.0).
8. **Vercel web-design-guidelines + pbakaus/impeccable** — quality gate final (a11y, tipografía,
   jerarquía) sobre el look europeo.

---

## 4. Inspiración concreta por escuela → academia de arte elegante

**Suiza (grid + rigor)**
- Grid 12 columnas / 8px como esqueleto del catálogo y la web; tipografía grotesca (IBM Plex Sans o
  Neue Haas Grotesk) para UI; **jerarquía por opacidad** de negro (nunca grises "sosos"); whitespace como
  estructura (herencia Mueller-Brockmann). El **oro como acento único** — como el Swiss red, pero dorado.
- Meta: pósters y catálogo con linaje de póster suizo — perfecto para una academia.

**París (alta costura)**
- "Arte para vestir": cada página = atelier. Serif de alto contraste (Didot/Cormorant/Playfair) para
  títulos; **reglas hairline doradas**; interletraje amplio en mayúsculas; bordes finos tipo foil.
- Mentalidad couture: AI como "creative accelerator", **curaduría humana** = el toque de lujo.
- Asimetría editorial elegante, espacio "de boutique": poco, impecable, exclusivo.

**Nórdico (luz y contención)**
- Mucho aire blanco, luz, funcionalismo; **dorado en hebras finas** (hairlines, numeración, iconografía)
  sobre near-black; line-art para ilustraciones (fuerte en interiores Scandinavian/Japandi).
- Legibilidad y calma: el alumno recorre la academia sin ruido; el lujo nórdico = calidad sin logotipos.

**Italiano (renacimiento + belleza funcional)**
- **Proporción áurea** en composiciones (herencia Piero della Francesca/Botticelli); "disegno" =
  dibujo como estrategia: cada pieza comunica y resuelve. **El diseñador como intelectual**: la academia
  se posiciona como institución de pensamiento, no solo de técnica.
- "Beauty + function" (Castiglioni, Made in Italy): ornamento mínimo y significado máximo; mecenazgo
  Medici = la academia patrocina y exhibe a sus alumnos como los Medici a los artistas.
- Negro cálido (no `#000` puro, cerca de `#111`) + oro champagne `#EBDAB0` como luz.

**Directriz final blanco/negro/dorado brillante**
- Oro real `#C69B3C`–`#D4AF37` (nunca `#FFD700`), 5–15% de cobertura, metalizado vía foil/gradientes sutiles.
- Negro `#111111` como autoridad + atemporalidad; blanco como aire; champagne `#EBDAB0` como neutro suave
  de lectura. Esta triada + una escuela (suiza como esqueleto, parisina como tipografía, nórdica como
  respiración, italiana como proporción) = elegancia sin "AI slop".
