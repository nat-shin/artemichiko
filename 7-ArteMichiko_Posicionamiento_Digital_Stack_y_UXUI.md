# ArteMichiko — Framework de Posicionamiento Digital, Stack Tecnológico Definitivo y UX/UI por Página
### Extensión de "Estrategia Digital Definitiva" · Ciudad de México · Agosto 2026

---

## Cómo se relaciona este documento con el anterior

No reemplaza `ArteMichiko_Estrategia_Digital_Definitiva.md` — lo cierra en los tres puntos que quedaban abiertos o solo esbozados: **(1)** la decisión de stack tecnológico exacta, versión por versión, capa por capa; **(2)** el framework completo de Search & AI Visibility elevado de checklist (Parte 5) a arquitectura de 8 macro-áreas; **(3)** una especificación de UX/UI y visibilidad página por página, algo que antes solo existía para las tres piezas centrales (Umbral, Galería, Matriculación). Donde algo ya está resuelto en el documento anterior, aquí se referencia, no se repite.

**Numeración:** este documento continúa como Partes 17–20 del cuerpo ya existente (que cerraba en la Parte 16).

---

## Antes de empezar: un hallazgo que sí importa

Investigando el panorama competitivo (mismo ejercicio de la Parte 1) apareció una huella digital de ArteMichiko que ya existe, aunque no sea "la página oficial" que se está diseñando ahora:

- Un dominio previo, **artemichiko.com.mx**, indexado (hoy responde con error de servidor de forma intermitente), con copy propio: "Centro Cultural Académico de Dibujo y Pintura Artística Michiko", firmado por el **Profr. José Guadalupe Cabrera**, fundador y director, con una narrativa de origen **formada en China, de influencia taoísta y estética zen** — más de 35 años de trayectoria.
- Perfiles activos o abandonados en **Facebook** (`centroculturalmichiko`), **X/Twitter** (`@DibujoMichiko`), y una ficha en **Waze** con NAP (nombre-dirección-teléfono) propia.
- El copy heredado menciona explícitamente una **"Tienda de Arte"** como línea de negocio ya existente — venta de piezas, no solo formación.

**Por qué esto importa para el trabajo de las Partes 18–19:** la narrativa cultural que sostiene todo el sistema de diseño actual (Parte 0, Parte 2.2) está anclada en **Japón, México y Medio Oriente**. La narrativa heredada del fundador está anclada en **China y taoísmo**. No es un matiz — es una contradicción de hecho que un motor de IA puede citar en cualquiera de las dos versiones si el dominio viejo sigue indexado en paralelo al nuevo. Esto se convierte en dos acciones concretas de apalancamiento en la Parte 20 (#26 y #27), y en una advertencia explícita en la especificación de la página "Nosotros" (19.6): esa página no debería escribirse hasta resolver cuál historia de origen es la que se cuenta.

Esto no es una objeción al proyecto — es exactamente el tipo de señal de entidad fragmentada que la Parte 15 (#19) ya advertía en abstracto. Aquí aparece en concreto.

---

# PARTE 17 — Stack tecnológico definitivo

## 17.1 Principio rector

TypeScript de punta a punta. Runtime **Node-compatible** — no Bun como runtime de producción — pero cada capa donde la velocidad realmente se siente (bundler, compilador, motor de CSS, linter, y el proxy que sostiene el propio edge de Cloudflare) corre sobre **Rust**. El resultado técnico es equivalente al argumento de venta de Bun — velocidad nativa — sin heredar su principal riesgo real en 2026: compatibilidad todavía inconsistente con paquetes npm que dependen de bindings nativos (N-API) en escenarios de producción con dependencias de terceros no triviales (procesamiento de imágenes, PDFs, PACs de facturación — justo el tipo de integraciones que la Parte 7 ya exige). Node.js lleva quince años siendo el objetivo de compatibilidad número uno del ecosistema; Bun todavía se está poniendo al día con él, no al revés.

Dato que cierra el argumento con algo que ya estaba decidido sin saberlo: **Cloudflare, la infraestructura de edge ya elegida en la Parte 4, corre buena parte de su propio proxy sobre Pingora — su framework de proxy en Rust, open source desde 2024.** No hace falta elegir Bun para tener Rust por debajo del stack — ya está ahí, en la capa que de verdad importa (el borde de la red), y se le suma en cada herramienta de build.

## 17.2 Decisión capa por capa

| Capa | Elección | Motor real | Por qué | Alternativa descartada |
|---|---|---|---|---|
| Lenguaje | TypeScript estricto, todo el stack | `tsc` + tipos compartidos edge↔origen | Contrato único para `Artwork`, `GallerySequence`, `LeadProfile` (Parte 2.1/2.3) entre frontend, edge y CMS | JavaScript puro — descartado desde el documento original |
| Framework frontend | **Next.js 16.2+** (App Router, React 19.2) | Turbopack (Rust) por defecto desde Next.js 16, estable en dev y build | SSR/ISR real — no negociable para SEO+GEO (contenido debe existir sin JS, ver `no_js_fallback` de la Parte 2.1); View Transitions API nativa vía React 19.2; Build Adapters API estable (marzo 2026) permite desplegar en Cloudflare sin perder features | Astro — mejor Core Web Vitals "de fábrica" por su arquitectura de islas, pero complica el estado compartido y stateful que ya diseñaron las Partes 2.1/2.3 (interest_vector, readiness_score, filtrado sin recarga). Se documenta como alternativa válida si en Fase 1 se decide simplificar el alcance interactivo |
| Runtime edge | Cloudflare Workers, V8 isolates | (ya fijado, Parte 4) | Cold start sub-milisegundo, sin cambios | Deno Deploy / Vercel Edge — fragmentarían proveedor |
| Runtime origen/contenedor | **Cloudflare Containers** (GA 13 abril 2026) | Node.js 20.9+ LTS completo, Linux real, soporte de `node:fs`, `node:https` | Mismo proveedor que el edge — cierra el hueco que la Parte 4 dejaba abierto ("contenedores para lógica de negocio" sin especificar dónde); facturación "Active-CPU" (solo cobra cuando el CPU trabaja, no en reposo) | Fly.io / Railway — funcionan, pero fragmentan proveedor, facturación y superficie de NAP técnico |
| CSS | **Tailwind CSS v4** | Motor **Oxide**, reescrito en Rust + Lightning CSS | Configuración en CSS (`@theme`) mapea 1:1 a los tokens JSON de "Barro y Tinta" (Parte 3.1) sin capa de traducción; HMR de milisegundos a microsegundos en cambios incrementales | Tailwind v3 / CSS-in-JS — este último tiene costo en runtime que compite con el presupuesto de rendimiento ya ajustado por el WebGL del hero |
| Compilador TS/JS | SWC | Rust, ya integrado en Turbopack | Reemplaza Babel de forma nativa, 20-70x más rápido en transpilación | Babel |
| Lint + formato | **Biome** | Rust | Un solo binario reemplaza ESLint + Prettier; del orden de 15-17x más rápido en proyectos grandes | ESLint + Prettier por separado |
| Gestor de paquetes | pnpm | Node-compatible, symlinks eficientes, workspaces | Compatibilidad universal con el ecosistema npm sin el riesgo de paquetes nativos rotos bajo un runtime de producción todavía madurando | Bun como package manager/runtime — ver 17.1 |
| Orquestación monorepo (si se separa CMS / edge-functions / frontend) | Turborepo | Rust (mismo equipo que mantiene Next.js) | Cache remota de tareas; coherente si el proyecto crece a paquetes separados en Fase 2+ | Nx — más pesado de lo que este tamaño de proyecto necesita hoy |
| Animación 2D / scroll | **GSAP + ScrollTrigger**, **Motion** (ex Framer Motion), **Lenis** | JS optimizado, probado en producción a escala | GSAP+ScrollTrigger es el estándar de facto para el patrón scroll→espacio de la Galería (Parte 2.1) y las cuatro etapas del Umbral (Parte 2.2); Motion para microinteracciones de componentes React (hover, foco, estados de formulario); Lenis da la inercia de scroll que hace sentir "ma" en vez de un scroll nativo brusco | Animaciones solo-CSS — insuficiente para el control de timeline que piden 2.1 y 2.2 |
| Animación 3D / WebGL | **React Three Fiber + drei** sobre Three.js | WebGL como base; **WebGPURenderer** de Three.js como mejora progresiva con feature-detection | Ya implícito en la decisión de la Parte 2.1 (2–3 piezas "hero" en WebGL real, resto en capas 2D); WebGPU se activa solo donde el navegador lo soporta, con fallback automático a WebGL — nunca bloquea render | Babylon.js — ecosistema React más delgado |
| Transiciones nativas | **View Transitions API** | Nativa del navegador, expuesta de forma estable por React 19.2 / Next 16 | Transición ficha-de-obra ↔ galería sin librería adicional — encaja exacto con "la ficha se siente parte del mismo espacio", ya especificado en 2.1 | Librería de routing con transición custom |
| CMS headless | **Payload CMS** (TypeScript nativo, self-hosted) | Corre en el mismo Cloudflare Container Node | Un solo lenguaje de punta a punta; dueño de los datos propios — relevante para LFPDPPP (Parte 6.1), porque el dato no sale a un tercero administrado fuera de México; panel de administración autogenerado para que el equipo suba obra sin depender de un desarrollador | Sanity — mejor DX "fuera de la caja", pero es managed, no TypeScript-nativo en su núcleo, y complica la historia de residencia de datos |
| Base de datos | Postgres administrado (Neon o similar) para Payload; **Cloudflare D1** para lo transaccional ligero del CRM edge-native (ya mencionado en Parte 15 #16) | — | Relaciones Course↔Instructor↔Testimonial↔Artwork se modelan mejor en relacional que en documento | MongoDB |
| Imágenes | Cloudflare Images | (ya fijado, Parte 2.1) | Sin cambios | — |

## 17.3 Por qué no Bun, dicho una sola vez y con precisión

Bun promete un runtime, un bundler, un gestor de paquetes y un test runner en un solo binario, todo en Zig con partes en Rust/C, con benchmarks que en microtareas superan a Node. Eso es real. Lo que también es real en agosto de 2026: la superficie de compatibilidad con paquetes npm que usan addons nativos (procesamiento de imágenes server-side, generación de PDF, SDKs de PACs de facturación mexicanos) sigue siendo menos predecible bajo Bun que bajo Node — precisamente el tipo de dependencia que la Parte 7.2 (CFDI, PAC) y la Parte 2.1 (variantes de imagen) ya exigen. Elegir Node como runtime de origen no es conservadurismo — es no apostar la capa fiscal y legal del proyecto a la madurez de un ecosistema todavía en movimiento. La velocidad que Bun vende ya está capturada, sin ese riesgo, en Turbopack, SWC, Oxide y Biome — cada una resolviendo exactamente el cuello de botella que le corresponde, en vez de una apuesta de "todo o nada" al runtime completo.

## 17.4 Catálogo de experiencia — lo "cutting/bleeding-edge" traducido a componentes reales

```
UMBRAL          → SVG generativo (ya spec, Parte 2.2) + GSAP timeline de 4 etapas +
                   Lenis para el "peso" del scroll inicial
GALERÍA         → parallax de capas 2D (Parte 2.1) + 2-3 piezas en React Three
                   Fiber/WebGL + View Transitions al abrir ficha de obra +
                   WebGPU como mejora progresiva silenciosa
ÍCONOS          → sistema generativo propio (Parte 3.2), nunca librería importada
MICROINTERACCIÓN → Motion en foco/hover/error de formularios (Parte 3.3)
TEMA CLARO/OSCURO → decidido en el edge (Parte 3.4), tokens como JSON, no solo CSS
TRANSICIONES ENTRE PÁGINAS → View Transitions API nativa, sin librería adicional
```

Regla dura que ya vive en el sistema de diseño y se reafirma aquí: **`prefers-reduced-motion` desactiva todo lo anterior sin excepción** (Parte 3.1), y el `no_js_fallback` de la Parte 2.1 sigue siendo obligatorio — todo lo "bleeding-edge" de esta tabla es una capa de mejora progresiva sobre un sitio que ya funciona y ya es indexable sin ella.

---

# PARTE 18 — Framework maestro: Search & AI Visibility

## 18.1 El diagrama maestro (formalizado)

```
                 ┌─────────────────────┐
                 │   ENTITY · BRAND    │
                 │   TRUST · AUTHORITY │
                 └──────────┬──────────┘
                             │
             ┌───────────────┼───────────────┐
             ↓                ↓                ↓
          WEBSITE          FUENTES          RELACIONES
                            EXTERNAS        PÚBLICAS DIGITALES
             │                │                │
             └────────────────┼────────────────┘
                                ↓
                     SEARCH + AI VISIBILITY
                                ↓
                          TRÁFICO / LEADS
                                ↓
                             INGRESOS
```

```
                       SEARCH & AI VISIBILITY
                                │
              ┌──────────────────┴──────────────────┐
              │                                       │
     VISIBILIDAD EN BÚSQUEDA                  VISIBILIDAD EN IA
              │                                       │
       ┌──────┼───────┐                     ┌─────────┼─────────┐
       │      │       │                     │         │         │
   Técnica Semántica Contenido            AEO       GEO      LLMO
       │      │       │                     │         │         │
       └──────┴───────┘                     └────┬────┴─────────┘
              │                                    │
        Búsqueda tradicional                  Búsqueda generativa
```

Este es exactamente el modelo que trajiste — se adopta como el modelo operativo oficial del proyecto. Lo que sigue es su desarrollo en ocho macro-áreas, con lo que cada una significa en 2026 y con qué ya está resuelto o pendiente en el documento base.

## 18.2 Las ocho macro-áreas, desarrolladas

**1. Technical Foundation** — crawlability, indexación, rendering, performance, accesibilidad, seguridad, datos estructurados.
Objetivos de Core Web Vitals de campo (no de laboratorio) para lanzamiento: LCP < 2.5s incluso con el hero en WebGL (requiere blur-up/skeleton mientras carga la escena 3D), INP < 200ms, CLS < 0.1. `robots.txt` verificado + indexación en Bing ya están como acción #4 de la Parte 15 — aquí se añade **`llms.txt`** (18.4) como la pieza técnica que faltaba.

**2. Search Optimization** — SEO on-page, intención de búsqueda, SEO semántico, autoridad temática, enlazado interno, SERP features, zero-click. Ya desarrollado en la Parte 5.1 (clusters de intención CDMX). Lo que se añade aquí: arquitectura de URL por intención (`/cursos/`, `/galeria/`, `/blog/`) alineada con la jerarquía de la Parte 19, y enlazado interno bidireccional obra↔curso ya modelado en el campo `relatedCourseId` (Parte 2.1) — esa relación de datos es, sin más trabajo adicional, la columna vertebral del enlazado semántico entre Galería y Cursos.

**3. Content Intelligence** — SEO de contenido, ganancia de información, originalidad, contenido experto, arquitectura de contenido, frescura, SEO programático. Los tres pilares ya están definidos (Parte 5.1). Se añade la disciplina de `dateModified` ya exigida en la Parte 5.2/15/16, y el formato de bloque de respuesta directa (TL;DR al inicio, H2 en forma de pregunta) como plantilla obligatoria de cada artículo — ver Parte 19.10.

**4. AI Search Optimization** — AEO + GEO + LLMO + AIO + optimización de citación/mención de IA. Distinción operativa 2026: **AEO** apunta a respuestas directas (snippets, voz, chatbots — "posición cero"); **GEO** influye en qué dice un motor generativo cuando responde (ChatGPT, Perplexity, AI Overviews) más que en un ranking; **LLMO** optimiza para que el modelo *entienda* correctamente la entidad ArteMichiko al margen de una consulta específica (nombres de entidad consistentes, completitud contextual, encabezados jerárquicos claros). Las tres comparten una base técnica — datos estructurados, claridad de entidad, autoría verificable — pero se miden distinto: **share de citación en ChatGPT/Perplexity/AI Overviews** es la métrica de GEO; **presencia en snippet/panel** es la de AEO. La industria reporta que las visitas que llegan desde búsqueda de IA convierten notablemente mejor que el tráfico orgánico tradicional — razón adicional para no tratar esto como un canal secundario. La lista de prioridad de schema de la Parte 5.2 ya es correcta; no se repite aquí.

**5. Entity & Brand** — SEO de entidad, Knowledge Graph, SEO de marca, SEO de autor, gestión de reputación, E-E-A-T. Esta es la macro-área donde vive el hallazgo de la introducción: hoy la entidad "ArteMichiko" está fragmentada entre el dominio nuevo en construcción y el heredado (`artemichiko.com.mx`, Facebook, X). Cerrar eso es condición previa, no paralela, a que cualquier trabajo de E-E-A-T tenga efecto — un Knowledge Graph no se construye sobre una entidad con dos historias de origen contradictorias.

**6. Authority & Distribution** — backlinks, PR digital, menciones, citas, editores, comunidades, Reddit, búsqueda social, YouTube. Área que el documento base no desarrolla y que en 2026 pesa más de lo que pesaba en 2023: los sistemas de IA citan hilos de Reddit y contenido de video con una frecuencia notable al responder preguntas de recomendación ("mejor academia de arte para adultos en CDMX" es exactamente ese tipo de consulta). Acción concreta nueva: presencia editorial (no promocional) en subforos relevantes de arte/CDMX, y version corta en YouTube/TikTok del contenido del Pilar 3 (recorrido del alumno) que ya existe para el blog.

**7. Vertical / Multimodal Search** — local, internacional, imágenes, video, noticias, Discover, shopping, marketplaces, apps, búsqueda social. Local ya cubierto (5.1). Internacional ya tiene su propia Parte 8. Lo que se añade: la Galería y la Tienda de Arte (19.9) son, por naturaleza, el activo de **búsqueda de imágenes y shopping** del sitio — cada obra necesita alt-text descriptivo real (no decorativo) y metadata IIIF, y cada producto de la tienda necesita `Product`+`Offer` para aparecer en Google Shopping/Merchant Center si se decide vender en línea.

**8. Business & Measurement** — CRO, SEO de conversión, analítica, analítica de visibilidad de IA, atribución, inteligencia competitiva, experimentación, ingresos. La Parte 7.3 ya define el pipeline de analítica; aquí se añade el requisito específico de 2026: **atribución de tráfico referido por IA** (ChatGPT, Perplexity, Copilot aparecen hoy como fuente de referral distinguible en la mayoría de las plataformas de analítica) debe configurarse como canal propio desde el día uno, no como "tráfico directo" indistinguible — de lo contrario la métrica de citación de GEO no tiene forma de verificarse con datos reales.

## 18.3 Qué añade este documento a lo que ya resolvió la Parte 5

La Parte 5 ya resolvió: clusters de intención local, checklist de Google Business Profile, los tres pilares de contenido, la lista de prioridad de schema.org, y la razón por la que indexar en Bing importa. Nada de eso se repite. Lo que faltaba y queda cerrado aquí: el marco de las ocho macro-áreas como estructura permanente (no una lista de siglas), la distinción operativa AEO/GEO/LLMO con su métrica propia, el eje de Authority & Distribution que no existía, y la pieza técnica de `llms.txt`.

## 18.4 Nuevo: `llms.txt` / `llms-full.txt`

Práctica que se consolidó durante 2025-2026: un archivo de texto plano en la raíz del dominio (`/llms.txt`), en formato Markdown simple, que describe la organización, sus servicios/cursos y enlaces a las páginas más importantes — pensado explícitamente para que un agente de IA lo lea antes de rastrear el sitio completo. `llms-full.txt` es la versión extendida con el contenido completo de las páginas clave inline. Costo de implementación: bajo (es contenido, no ingeniería). Se añade como acción de apalancamiento #25 en la Parte 20.

## 18.5 GXO — el noveno eje que empieza a asomar

Generative Experience Optimization: preparar el sitio para que un **agente de IA autónomo** (no un humano leyendo una respuesta) pueda completar una acción — agendar una clase de prueba, comprar una pieza de la Tienda de Arte — en nombre de un prospecto. Hoy (agosto 2026) es incipiente, no una prioridad de Fase 1 o 2. Se deja anotado porque el propio Cloudflare AI Search ya es compatible con MCP (Parte 4.1) — es decir, la infraestructura para que un agente externo consulte el contenido de ArteMichiko como herramienta ya está construida sin esfuerzo adicional. Cuando GXO madure, ArteMichiko no parte de cero.

---

# PARTE 19 — UX/UI y visibilidad, página por página

Para cada página: objetivo de negocio, elementos de UX/UI (con los componentes exactos de la Parte 17), señales de visibilidad (schema.org + táctica prioritaria), y la macro-área de la Parte 18 donde más pesa esa página.

## 19.1 El Umbral / Home

Ya especificado en profundidad en la Parte 2.2 — no se repite la coreografía de cuatro etapas. Se añade lo que faltaba:
- **UX/UI:** entrada con View Transition hacia la primera obra curada (ya spec en 2.2); placeholder de baja resolución mientras carga la escena WebGL, para no romper LCP.
- **Visibilidad:** `Organization` + `WebSite` schema con `sameAs` apuntando a los perfiles **nuevos y consolidados** (ver 20, acción #27); title/meta-description con la keyword de Cluster 1 (Parte 5.1) en las primeras palabras, no al final.
- **Macro-área dominante:** Technical Foundation + Entity & Brand.

## 19.2 La Galería

Ya especificada en profundidad en la Parte 2.1. Se añade:
- **UX/UI:** transición ficha-de-obra vía View Transitions API (17.2); fallback de grid estático paginado ya definido — ahí es donde vive el SEO real de cada obra individual.
- **Visibilidad:** `VisualArtwork`/`ImageObject` por pieza, alt-text descriptivo (nunca decorativo — "óleo sobre tela, técnica de veladuras, 40×60cm" en vez de "obra de arte"), metadata IIIF donde exista escaneo 3D (`model3dRef`, ya en el modelo de datos).
- **Macro-área dominante:** Vertical/Multimodal Search (imágenes) + Content Intelligence.

## 19.3 Cursos — catálogo

Página que el documento base no detallaba individualmente.
- **UX/UI:** grid filtrable reutilizando el mismo `FilterEngine` de la Galería (consistencia de modelo de interacción, no un componente nuevo); tarjeta nivel-1 (Parte 3.3) con duración, nivel y — pendiente de la decisión de negocio #13 (Parte 15) — precio visible o no.
- **Visibilidad:** `ItemList` + `Course` por entrada; enlazado hacia la Galería filtrada por el medio de cada curso, aprovechando el campo `tags[]` ya existente en `Artwork`.
- **Macro-área dominante:** Search Optimization (Cluster 2, comparación).

## 19.4 Curso — ficha individual

- **UX/UI:** CTA fijo hacia el widget de WhatsApp de matriculación (Parte 2.3); mini-tarjeta del docente enlazando a 19.5; carrusel de obras relacionadas vía `relatedCourseId` (ya existe en el modelo de datos de la Parte 2.1 — cero trabajo adicional de arquitectura).
- **Visibilidad:** `Course` + `CourseInstance` + `Offer` (+ `AggregateRating` si hay reseñas); primer párrafo como respuesta directa ("¿Qué aprenderás en Grabado Experimental? ...") para AEO; bloque de preguntas frecuentes propio del curso, que alimenta el `FAQPage` global (Parte 5.2, prioridad #1).
- **Macro-área dominante:** AI Search Optimization + Business & Measurement (es la página de conversión más específica del sitio).

## 19.5 Docentes

- **UX/UI:** fotografía editorial, no de estudio genérico (coherente con la tendencia ya identificada en 2.2); insignias de credenciales usando el sistema de íconos generativo (3.2), no badges importados.
- **Visibilidad:** `Person` schema con credenciales verificables y `sameAs` a cualquier biografía o cobertura externa existente.
- **Por qué esta página pesa más de lo que parece:** es, en términos prácticos, **donde se construye la credencial institucional citable** que la Parte 1.3 identificó como la única ventaja real de Atelier México. Si ArteMichiko no tiene todavía un equivalente formal a la certificación ARC, esta página es el lugar donde cualquier credencial parcial (formación documentada, membresías, trayectoria verificable del Profr. Cabrera u otros docentes) debe presentarse con el mayor rigor factual del sitio — es el material que un motor de IA cita cuando compara.
- **Macro-área dominante:** Entity & Brand.

## 19.6 Nosotros / Historia

⚠️ **No se recomienda escribir el copy final de esta página hasta resolver la contradicción narrativa señalada en la introducción** (China/taoísmo del sitio heredado vs. Japón/México/Medio Oriente del sistema de diseño actual). Es una decisión de negocio, no de diseño.
- **UX/UI:** componente de línea de tiempo respetando el ritmo `space-ma` (Parte 3.1); sección de fundador con la misma disciplina fotográfica que 19.5.
- **Visibilidad:** `AboutPage`, fecha de fundación consistente en todas las superficies (ancla del NAP).
- **Macro-área dominante:** Entity & Brand.

## 19.7 Matriculación

Ya especificada en profundidad en la Parte 2.3. Sin cambios de UX — se añade solo: la página en sí no lleva schema propio indexable (es un embudo, no contenido); el schema relevante vive en la página del curso que la origina (19.4).
**Macro-área dominante:** Business & Measurement (CRO).

## 19.8 Precios / Inversión

Depende directamente de la decisión de negocio pendiente (#13, Parte 15: transparencia de precios sí/no). Se documentan las dos rutas de UX, con una recomendación:
- **Opción transparente:** tabla de precios por curso/modalidad, con `PriceSpecification` dentro de cada `Offer`. Recomendada por razón de GEO específica: las respuestas generativas de IA cada vez citan rangos de precio directamente cuando están disponibles como dato estructurado; ocultarlos no protege el precio, solo cede esa respuesta a un competidor que sí los publique.
- **Opción "cotiza con nosotros":** CTA hacia WhatsApp sin cifra pública — válida solo si la razón de negocio (precios variables por paquete, negociación caso por caso) es real y no solo fricción de conversión evitada.
- **Macro-área dominante:** AI Search Optimization + Business & Measurement.

## 19.9 Tienda de Arte

Página nueva en este framework — no aparecía en el documento base, pero **ya es una línea de negocio real** según la huella digital heredada (introducción). Si se confirma que sigue activa:
- **UX/UI:** tarjetas de producto con el mismo lenguaje visual de la Galería, pero con precio y CTA de compra — el visitante debe sentir que está en la misma "sala", no en un e-commerce genérico aparte.
- **Checkout:** vía Stripe, ya decidido para pagos internacionales (Parte 7.2) — se reutiliza, no se construye aparte.
- **Implicación legal a verificar:** la Parte 6.5 ya advertía que vender merchandising o materiales de marca propia puede requerir una clase adicional en el registro IMPI — vender obra original probablemente también, y debe confirmarse con el trámite en curso.
- **Visibilidad:** `Product` + `Offer` por pieza, habilita aparición en Google Shopping/Merchant Center si se decide.
- **Macro-área dominante:** Vertical/Multimodal (shopping) + Business & Measurement.

## 19.10 Blog / Revista

Los tres pilares ya están definidos (Parte 5.1). Se añade la plantilla obligatoria de cada artículo para AEO/GEO:
- **Estructura:** bloque de respuesta directa (2-3 líneas) inmediatamente después del título, encabezados H2 formulados como pregunta cuando aplique, datos concretos antes que adjetivos.
- **Visibilidad:** `Article` con `dateModified` actualizado en cada revisión sustantiva (ya exigido en 5.2/15/16 — aquí se traduce en plantilla de contenido, no solo en regla operativa).
- **Macro-área dominante:** Content Intelligence.

## 19.11 Testimonios

- **UX/UI:** formato video-primero cuando exista (mayor señal de confianza que el texto solo); reutiliza el contenido del Pilar 3 del blog ("un día en ArteMichiko", ya definido en 5.1) en vez de producir contenido aparte.
- **Visibilidad:** `Review`/`AggregateRating` enlazado tanto a `LocalBusiness` como al `Course` específico — alimenta directamente la estrategia de velocidad de reseñas de Google Business Profile (5.1) y el mecanismo de retención post-curso (Parte 15, #12).
- **Macro-área dominante:** Authority & Distribution.

## 19.12 Internacional (Asia / Medio Oriente)

El contenido de fondo ya vive en la Parte 8 del documento base — aquí solo la capa técnica y de UX que le corresponde:
- **UX/UI:** selector de idioma/moneda explícito (no autodetección silenciosa); bloque de preguntas frecuentes propio sobre visado y logística (dato que la Parte 8 ya identifica como crítico para no perder prospectos calificados).
- **Visibilidad:** `hreflang` real por idioma con estructura de URL dedicada (ya anticipado en el roadmap, Fase 4 — Parte 14), no solo un selector visual sin respaldo técnico.
- **Macro-área dominante:** Vertical/Multimodal (internacional) + AI Search Optimization (reforzar en la estructura del sitio, no solo en el copy, que ArteMichiko atiende activamente a Asia/Medio Oriente).

## 19.13 Contacto / Ubicación

- **UX/UI:** mapa embebido, WhatsApp como CTA principal (coherente con la Parte 7.1), horarios y acceso.
- **Visibilidad:** esta es la página donde el NAP debe coincidir **exactamente** con Google Business Profile, Apple Maps y Bing Places (regla ya fijada como acción #19 de la Parte 15) — es también la primera página que un validador de schema revisa.
- **Macro-área dominante:** Technical Foundation + Entity & Brand.

## 19.14 Legal (aviso de privacidad, términos)

Contenido ya completamente resuelto en la Parte 6 — aquí solo la nota de visibilidad que faltaba: estas páginas deben ser **indexables**, no `noindex`. La presencia visible de un aviso de privacidad conforme a LFPDPPP post-reforma es, en sí misma, una señal de legitimidad que tanto buscadores tradicionales como sistemas de IA usan al evaluar confianza de marca.
**Macro-área dominante:** Entity & Brand (confianza).

## 19.15 FAQ (página dedicada)

La Parte 5.2 ya identificó `FAQPage` con preguntas reales como el dato estructurado de mayor impacto para GEO (prioridad #1) y la Parte 15 (#5) ya lo marca como la acción de mayor apalancamiento del proyecto. Lo que faltaba: una **página propia** que agregue esas preguntas, no solo el schema disperso en cada curso — porque los sistemas de IA valoran el contenido real de la página, no únicamente su marcado.
- **UX/UI:** acordeón usando la curva `ease-respuesta` del sistema de diseño (3.1).
- **Visibilidad:** `FAQPage` a nivel de sitio, alimentado por las preguntas reales extraídas de WhatsApp una vez operando la matriculación (mismo mecanismo ya definido en 5.2).
- **Macro-área dominante:** AI Search Optimization.

---

# PARTE 20 — Cómo esto entra al roadmap y a las acciones de mayor apalancamiento

Todo lo anterior se inserta en las Fases ya definidas (Parte 14) sin reordenarlas: el stack de la Parte 17 es la base técnica de la Fase 1 (MVP); el framework de ocho macro-áreas de la Parte 18 es la lente con la que se ejecutan las Fases 1-3 de visibilidad; las páginas de la Parte 19 son el inventario completo de lo que la Fase 1 debe construir, no solo las tres piezas centrales.

**Nuevas acciones de mayor apalancamiento** (continúan la numeración de la Parte 15):

| # | Acción | Por qué importa | Costo/Complejidad | Si no se hace |
|---|---|---|---|---|
| 24 | Decidir Payload CMS vs. Sanity antes de Fase 1 | Determina si el CMS vive en el mismo Container Node (coherencia total de stack) o en un proveedor externo | Medio | Bloquea la Parte 3.6 (tokens consumidos por el CMS) y la Parte 17 completa |
| 25 | Publicar `llms.txt` / `llms-full.txt` en la raíz del dominio | Capa de descubribilidad para agentes de IA, práctica de bajo costo y alto apalancamiento en 2026 | Bajo | Se pierde una señal barata de LLMO que varios competidores internacionales ya están adoptando |
| 26 | Resolver la contradicción narrativa del fundador (China/taoísmo del sitio heredado vs. Japón-México-Medio Oriente del sistema actual) antes de escribir "Nosotros" | Bloquea la página de mayor peso para Entity & Brand y para cerrar la brecha de credencial de la Parte 1.3 | Bajo, decisión de negocio | Un motor de IA puede citar dos versiones contradictorias de la historia del fundador si el dominio heredado sigue indexado en paralelo |
| 27 | Redirigir (301) o reclamar formalmente el dominio heredado (`artemichiko.com.mx`) y los perfiles heredados (X `@DibujoMichiko`, Facebook `centroculturalmichiko`) hacia los activos nuevos | Consolida la entidad en vez de fragmentarla entre un sitio nuevo y uno viejo indexado en paralelo | Bajo-medio | Google/Bing/ChatGPT pueden seguir citando la versión antigua y desactualizada junto con — o en vez de — la nueva |
| 28 | Confirmar si la Tienda de Arte sigue operando y si requiere clase IMPI adicional | Determina si la Parte 19.9 se construye en Fase 1 o se pospone | Bajo, decisión de negocio + verificación legal | Se lanza sin una línea de ingresos ya validada por el negocio, o se registra la marca sin la clase que la protege |

## Cierre

La Parte 0 del documento base decía que ArteMichiko no tiene que alcanzar a nadie en tecnología o experiencia — que ya los supera a todos en ese eje. Este documento no cambia esa tesis; la vuelve ejecutable: un stack cerrado y versionado (Parte 17), un framework de visibilidad completo y no una lista de siglas (Parte 18), y un inventario de cada página con su UX/UI y su táctica de visibilidad específica (Parte 19). Lo único genuinamente nuevo que aparece aquí — y que ningún documento anterior podía ver porque nadie había buscado todavía la huella digital heredada — es que parte del trabajo de la Parte 1.3 (cerrar la brecha de credencial) y de la Parte 15 (#19, consistencia de entidad) ya tiene una causa concreta y accionable: una historia de origen que hoy vive en dos versiones, y un dominio antiguo que sigue hablando en nombre de ArteMichiko sin que el proyecto nuevo lo haya decidido todavía.

---

### Fuentes consultadas (agosto 2026)

- Cloudflare — Containers, estado GA y changelog (developers.cloudflare.com/containers, /changelog)
- Next.js — notas de la versión 16, 16.1, 16.2, 16.3 y guía de actualización (nextjs.org/blog, nextjs.org/docs)
- Tailwind CSS — blog oficial del motor Oxide (tailwindcss.com/blog/tailwindcss-v4-alpha) y análisis técnicos independientes de rendimiento 2026
- Cobertura independiente 2026 sobre el panorama GEO/AEO/LLMO (Writer, Optimal.dev, Button Block, entre otros)
- Huella digital pública de ArteMichiko: Instagram (@artemichiko), dominio heredado artemichiko.com.mx, Facebook (centroculturalmichiko), X (@DibujoMichiko), ficha en Waze
