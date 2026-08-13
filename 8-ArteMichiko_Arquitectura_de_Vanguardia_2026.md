# ArteMichiko — Arquitectura de Vanguardia, Capacidades Nativas 2026 y Visibilidad IA con Evidencia de Terreno
### Sucesor de "Framework de Posicionamiento Digital, Stack Tecnológico Definitivo y UX/UI por Página" · Ciudad de México · Agosto 2026

---

## Cómo se relaciona este documento con el anterior

No reemplaza `ArteMichiko_Estrategia_Digital_Definitiva.md` (el documento base, Partes 0–16) ni la mayor parte de `7-ArteMichiko_Posicionamiento_Digital_Stack_y_UXUI.md` (Partes 17–20). Lo audita con investigación de mercado hecha en este momento —agosto de 2026— y lo mueve en tres direcciones:

1. **Corrige una decisión estructural con un dato que cambia el cálculo.** Entre que se redactó la Parte 17 y hoy, ocurrió el evento tecnológico más relevante para este proyecto en concreto: **Cloudflare adquirió Astro** (16 de enero de 2026). El documento anterior evaluó Astro por sus méritos de siempre —cero JavaScript por defecto, islas— y lo descartó por una razón de arquitectura de estado que en ese momento era válida. Esa razón ya no lo es: Astro 5 resolvió exactamente ese problema con Server Islands, y Astro 6 (beta desde enero, estable desde marzo de 2026) ya corre bajo el mismo techo corporativo que el edge que este proyecto ya eligió. No es una preferencia estética por un framework más nuevo — es que la pila completa (framework de frontend, adaptador de despliegue, runtime de edge, imágenes, base de datos, contenedores, búsqueda con IA) pasa a tener **un solo proveedor real**, algo que la propia Parte 17 identificaba como criterio de decisión cuando descartó Deno Deploy y Vercel Edge por "fragmentar proveedor" — el mismo argumento, aplicado con consistencia, apunta ahora a otro lugar.
2. **Incorpora capacidades nativas de HTML/CSS/JS que en agosto de 2026 ya no son apuestas de riesgo, sino la opción por defecto razonable** — varias de ellas no existían con soporte suficiente cuando se escribió la Parte 17.
3. **Corrige con datos de campo, no de intención, dos piezas del framework GEO/AEO/LLMO** (Parte 18 del documento anterior) que en la teoría de 2025 sonaban bien y en la práctica medida de 2026 se comportan distinto — en un caso, muy distinto.

Todo lo que la Parte 17 decidió y que aquí **no** se menciona sigue vigente sin cambios: TypeScript de punta a punta, Node como runtime de producción, Tailwind CSS v4/Oxide, SWC, Biome, pnpm, Payload CMS, Cloudflare D1, Cloudflare Images, GSAP/Motion/Lenis para las piezas que de verdad los necesitan, y React Three Fiber/WebGPU para las piezas hero de la Galería. Ninguna de esas decisiones se revisita porque ninguna de ellas quedó obsoleta — la que quedó obsoleta es la capa que las envuelve a todas: qué framework renderiza las páginas y en qué infraestructura corre por defecto.

**Numeración:** este documento continúa como Partes 21–28 del cuerpo ya existente (que cerraba en la Parte 20).

---

# PARTE 21 — La decisión de framework, reabierta con un dato nuevo

## 21.1 Qué seguía correcto en la Parte 17 y por qué se conserva

La lógica de "usar Rust donde la velocidad se siente, sin apostar todo el runtime a Bun" seguía —y sigue— siendo la decisión correcta en agosto de 2026. Bun no ha resuelto de forma decisiva su superficie de compatibilidad con paquetes nativos (procesamiento de imágenes, PDF, PACs de facturación mexicanos) al nivel que este proyecto necesita para su capa fiscal y legal. Turbopack, SWC, Oxide y Biome siguen entregando la velocidad que Bun promete sin ese riesgo. **Esto no cambia.**

Tampoco cambia la elección de Payload CMS. La comparación 2026 entre Payload, Directus y Strapi para un proyecto nuevo, en TypeScript, sin base de datos heredada, sigue favoreciendo a Payload por la misma razón que la Parte 17 ya daba: esquema definido en código, tipos compartidos de punta a punta, residencia de datos propia (relevante para LFPDPPP), sin capa de traducción entre el modelo de datos y el CMS. Directus gana cuando ya existe una base de datos relacional que hay que envolver — no es el caso de ArteMichiko, que construye desde cero.

Lo que sí cambia es la pieza que estas dos decisiones envolvían: el framework de frontend.

## 21.2 El hallazgo: Cloudflare es dueño de Astro desde enero de 2026

El 16 de enero de 2026, Cloudflare anunció la adquisición de The Astro Technology Company — el equipo completo que crea y mantiene Astro se incorporó a Cloudflare, con el compromiso explícito de mantener el framework abierto (licencia MIT) y con un fondo de ecosistema (Astro Ecosystem Fund) respaldado también por Netlify, Wix, Webflow y Sentry. Tres meses después, en marzo de 2026, salió Astro 6.0 estable, con dos piezas que resuelven, de forma directa, la única objeción real que la Parte 17 le había puesto a Astro:

```
LO QUE LA PARTE 17 OBJETABA A ASTRO (agosto 2025, momento de esa decisión)
    "complica el estado compartido y stateful que ya diseñaron las Partes
     2.1/2.3 (interest_vector, readiness_score, filtrado sin recarga)"

LO QUE ASTRO 5/6 YA RESUELVE (estable desde marzo de 2026)
    Server Islands (server:defer)
        → un componente puede renderizarse dinámicamente, con acceso a
          cookies/sesión, sobre una página que por lo demás es HTML
          estático cacheado — exactamente el patrón que necesita
          "mostrar la ficha pre-llenada porque ya sabíamos algo del
          visitante" sin convertir el sitio entero en una app SSR

    nanostores (mantenido por el propio equipo de Astro)
        → store minúsculo, agnóstico de framework, pensado
          específicamente para compartir estado entre islas —
          interest_vector y readiness_score (Parte 2.3 del documento
          base) viven aquí, no en contexto de React global

    Astro 6 — workerd como dev server
        → el entorno de desarrollo local corre sobre el mismo motor
          (workerd) que usa Cloudflare Workers en producción; termina
          la clase de bug "funciona en local, se rompe en el edge" que
          documenta cualquier equipo que despliega Next.js en
          Cloudflare vía capas de adaptación

    Astro 6 — Live Content Collections + CSP API + Fonts API integrada
        → contenido servido por Payload puede actualizarse sin
          reconstruir el sitio completo; cabeceras CSP con hashing
          automático, sin gestión manual (relevante para 26.1); fuentes
          autoalojadas sin herramienta adicional
```

La objeción de fondo —"Astro no maneja bien lo interactivo"— nunca fue del todo cierta ni siquiera en 2025: la arquitectura de islas siempre permitió montar componentes de cualquier framework (React incluido) donde se necesitara interactividad real. Lo que Astro no resolvía bien hasta la versión 5 era el **estado compartido entre esas islas sin convertir todo en una SPA**. Ese, específicamente, es el problema que Server Islands + nanostores cierran.

## 21.3 La decisión: arquitectura híbrida Astro 6 + islas React, sobre Cloudflare nativo

**Perfil real de contenido del sitio (Parte 19 del documento anterior, veinte páginas):** de las veinte páginas especificadas, **diecisiete son fundamentalmente contenido** — Home/Umbral, Cursos (catálogo y ficha), Docentes, Nosotros, Precios, Blog, Testimonios, Internacional, Contacto, Legal, FAQ, Tienda — y solo **tres exigen interactividad con estado real de cliente**: el Umbral (coreografía del hero), la Galería (scroll→espacio, filtrado sin recarga, personalización) y la Matriculación (progressive profiling, señal implícita de sesión). Construir las diecisiete páginas de contenido sobre un framework de aplicación completo porque tres piezas lo necesitan es exactamente el tipo de sobreingeniería que el encargo original pidió evitar.

```
ARQUITECTURA PROPUESTA

    ASTRO 6                    → shell del sitio completo, cero JS por
    (meta-framework)             defecto en toda página que no lo
                                  necesita; adaptador nativo de
                                  Cloudflare Workers (mismo equipo,
                                  mismo binario workerd en dev y prod)

    ISLAS REACT 19              → montadas solo en Umbral, Galería y
    (client:load /               Matriculación; aquí vive intacto todo
     client:visible /            lo que la Parte 17.4 ya había resuelto:
     server:defer)               GSAP+ScrollTrigger+Lenis, Motion,
                                  React Three Fiber+drei+WebGPU,
                                  View Transitions

    nanostores                  → interest_vector, readiness_score y el
                                  estado del FilterEngine, compartidos
                                  entre la isla de Galería y la de
                                  Matriculación sin pasar por props ni
                                  por un framework de estado pesado

    PAYLOAD CMS                 → sin cambios de la Parte 17: TypeScript
    (Cloudflare Container)        nativo, dueño del dato; se consume
                                  desde Astro vía Content Layer API
                                  (carga en build para contenido
                                  estable, Live Content Collections
                                  para catálogo de cursos/precios que
                                  cambia sin republicar el sitio entero)

    CLOUDFLARE WORKERS           → sin cambios de la Parte 4/17: auth,
    + D1 + Images                  A/B testing, CRM edge-native,
                                    variantes de imagen
```

**Qué NO cambia de la Parte 17.4 (catálogo de experiencia):** absolutamente nada de la tabla de componentes cutting-edge. GSAP sigue orquestando las cuatro etapas del Umbral y el scroll→espacio de la Galería; R3F+WebGPU sigue reservado a las 2–3 piezas hero; View Transitions sigue resolviendo la transición ficha-de-obra. Lo único que cambia es el contenedor: en vez de vivir dentro de App Router de Next.js, esos mismos componentes React viven dentro de una isla de Astro. El trabajo de diseño de interacción de la Parte 2.1/2.2/2.3 del documento base se traslada sin rediseñar nada.

## 21.4 Astro 6 frente a Next.js 16.3 — la comparación directa, hecha con la versión de cada uno que existe hoy

Next.js no se queda quieto: la versión 16.3 (agosto de 2026) trajo *Instant Navigations* — un sistema real y bien resuelto para que las navegaciones server-driven se sientan como una SPA sin perder el modelo de servidor, más una reducción de hasta 90% en memoria de desarrollo. Es la actualización más importante del framework desde octubre de 2025 y hay que reconocerle mérito real: si este proyecto fuera una aplicación con estado complejo en la mayoría de sus pantallas — un LMS completo, un panel de alumno con mucha interacción — Next.js 16.3 seguiría siendo una opción defendible. No es el caso de ArteMichiko, cuyo perfil de página es mayoritariamente editorial.

| Criterio | Astro 6 + islas React (Cloudflare nativo) | Next.js 16.3 (App Router, sobre Cloudflare vía adaptador) |
|---|---|---|
| JS enviado en páginas de contenido | ~0 KB por defecto; solo se hidrata lo que lleva `client:*` | Bundle de React siempre presente aunque la página sea estática, salvo trabajo manual de aislar Server Components puros |
| Core Web Vitals de fábrica | Lighthouse 95–100 típico en páginas de contenido, sin optimización manual | Alcanzable, pero requiere disciplina activa (el propio equipo de Next construyó "Instant Insights" en 16.3 porque los equipos regresionaban esto sin darse cuenta) |
| Paridad dev/prod en Cloudflare | Total — Astro 6 corre `workerd` en local, el mismo motor del edge | Parcial — pasa por una capa de adaptación (Build Adapters API u OpenNext); mejoró mucho en 16.2, pero sigue siendo una traducción, no el mismo runtime |
| Alineación de proveedor | Un solo proveedor para framework, edge, contenedores, imágenes, D1, búsqueda IA | Vercel es el proveedor natural del framework; correr en Cloudflare es soportado pero es una integración de segunda parte |
| Interactividad compleja (Galería/Umbral) | React 19 completo dentro de la isla — cero pérdida de capacidad | Nativo, es su terreno natural |
| Estado compartido entre secciones stateful | nanostores + Server Islands — resuelto desde Astro 5 (nov. 2024), maduro | Nativo vía Context/estado de servidor |
| Riesgo de sobreingeniería en páginas simples (Blog, Docentes, FAQ, Legal) | Ninguno — es exactamente su caso de uso de diseño | Real si no hay disciplina de equipo — es fácil que una página de FAQ termine hidratando más de lo necesario |
| Curva de adopción del equipo | Menor superficie conceptual para el 85% del sitio; una isla React sigue siendo React | Uniforme en todo el sitio, un solo modelo mental |
| Roadmap y respaldo | Financiado directamente por Cloudflare, con fondo de ecosistema multi-proveedor (incluye Sentry, Netlify, Wix) | Financiado por Vercel, con incentivo de producto hacia su propia nube |

**Veredicto:** Astro 6 como meta-framework, islas React 19 donde el diseño de interacción ya definido lo exige, todo sobre el adaptador nativo de Cloudflare. No es un rechazo de Next.js como tecnología — es el reconocimiento de que el 85% del sitio es contenido, y que el proveedor de infraestructura ya elegido ahora también es dueño del framework que mejor sirve contenido.

## 21.5 CSS: Tailwind v4/Oxide se mantiene, y gana un ajuste que no cuesta nada implementar

La Parte 17 ya eligió bien: Tailwind v4 sobre el motor Oxide (Rust), con tokens en `@theme` mapeando 1:1 al JSON de "Barro y Tinta" (Parte 3.1 del documento base). Un dato que refuerza esa decisión sin cambiarla: **Tailwind v4 ya construye su paleta por defecto sobre el espacio de color OKLCH**, no sobre HEX/RGB. OKLCH tiene soporte maduro en los cuatro motores de navegador desde 2023 y cobertura global por encima de 93% en 2026 — ya no es una apuesta.

Esto importa específicamente para ArteMichiko porque el sistema de diseño de la Parte 3 del documento base ya está pensado como **función paramétrica generativa**, no como paleta fija — y OKLCH es, literalmente, el espacio de color diseñado para que ese tipo de función funcione bien: a diferencia de HSL, donde subir la luminosidad de terracota y de dorado el mismo porcentaje produce resultados visualmente desiguales, en OKLCH un mismo delta de luminosidad se percibe igual en cualquier tono. Definir `terracota`, `dorado` y `musgo` como valores OKLCH en vez de HEX no es trabajo adicional — es el formato nativo del motor ya elegido, y hace que `IconMotif.derive_from(GeometricMotif)` (Parte 3.2 del documento base) pueda generar variantes de color por interpolación matemática confiable, en vez de mezclas manuales caso por caso.

---

# PARTE 22 — Capacidades nativas de HTML/CSS/JS: qué adoptar en 2026 y qué todavía no

La Parte 17.4 ya documentó bien el catálogo de componentes complejos (GSAP, R3F, View Transitions). Lo que faltaba es la capa de abajo: qué puede resolverse con la plataforma web misma, sin ninguna librería, en las páginas que no son Umbral/Galería/Matriculación — y dónde exactamente está hoy la línea entre "ya es seguro usar esto en producción" y "todavía es apuesta".

## 22.1 Adoptar ahora, sin reserva

| Capacidad | Soporte real, agosto 2026 | Dónde se usa en ArteMichiko |
|---|---|---|
| **CSS Scroll-Driven Animations** (`animation-timeline: view()` / `scroll()`) | ~84–90% global, en los cuatro motores | Reveals y microtransiciones en Blog, Cursos, Docentes, FAQ, Testimonios — reemplaza patrones basados en `IntersectionObserver` sin una sola línea de JS de terceros. **No** reemplaza GSAP en Umbral/Galería: no iguala aún el control de *scrub*, *pin* y timelines encadenadas que esas dos piezas necesitan — ahí GSAP+ScrollTrigger sigue siendo la herramienta correcta, exactamente como ya definía la Parte 17.2 |
| **View Transitions API — variante cross-document** | Estable en Chromium/Edge, avanzando en el resto | Transición Home→Curso→Galería como navegación completa de página (Astro la soporta de forma nativa), sin necesidad de un router de SPA para conseguir la sensación de continuidad que la Parte 2.1 pedía |
| **Popover API** (`popover`, `popovertarget`) | Soporte maduro en los cuatro motores desde 2024–2025 | Menú móvil, aviso de cookies/LFPDPPP, ficha rápida de obra en el grid estático (`no_js_fallback` de la Parte 2.1) — cero librería de modales |
| **Container Queries** | Universal | La tarjeta de curso y la tarjeta de obra (nivel-1, Parte 3.3 del documento base) se adaptan a su contenedor real, no al viewport — necesario porque ambas aparecen en layouts distintos (grid completo, carrusel de relacionados, resultado de búsqueda) |
| **`:has()`** | Universal | Estados de formulario de matriculación (campo con error, grupo completo) sin JavaScript adicional — encaja con la regla ya fijada en la Parte 3.3 de errores directos, no genéricos |
| **`color-mix()` + `@property`** | Universal | Estados de hover/foco animables sobre los tokens OKLCH (21.5) sin precalcular cada variante a mano |
| **Speculation Rules API** | Chromium; degrada sin romper nada en el resto | Precarga especulativa de la ficha de curso al pasar el cursor sobre su tarjeta — mejora percibida de velocidad sin JavaScript de prefetch de terceros |
| **CSP vía Astro 6 (`csp` en config)** | Nativo del framework ya elegido | Cabeceras de seguridad con hashing automático de scripts/estilos — ver Parte 25.1 |

## 22.2 Usar con criterio, no por defecto

- **Anchor Positioning API:** soporte aún desigual fuera de Chromium. Sirve para tooltips y menús desplegables simples (créditos de docente, glosario de técnicas); para overlays complejos, seguir con una librería ligera hasta que el soporte cierre.
- **`<dialog>` nativo:** perfecto para confirmaciones simples (envío de matriculación exitoso). Para el flujo completo de matriculación con progressive profiling, sigue siendo mejor un componente propio — `<dialog>` no da el control fino de foco y animación que ese flujo necesita.
- **`<model-viewer>` (web component, mantenido por Google, sobre Three.js):** vale la pena para la vista de detalle de una obra individual con escaneo 3D (`model3dRef`, ya en el modelo de datos de la Parte 2.1) cuando esa obra se muestra *aislada*, fuera del espacio completo de la Galería — es más liviano que envolver cada pieza en R3F. Dentro del espacio completo de la Galería, donde varias piezas conviven en la misma escena, R3F sigue siendo la herramienta correcta, tal como ya fijaba la Parte 17.2.

## 22.3 Esperar

- **`animation-trigger`** (activadores de animación más allá del scroll): solo Chrome/Edge en 2026. No usar como dependencia de una interacción principal todavía.
- **WCAG 3.0:** sigue en fase de borrador de trabajo (última actualización, septiembre de 2025), sin fecha de recomendación final antes de 2029. **No es el estándar de cumplimiento.** El estándar de cumplimiento en 2026 sigue siendo WCAG 2.2 AA — y aquí hay un dato que sí vale la pena incorporar: en octubre de 2025 el W3C consiguió que WCAG 2.2 fuera reconocido formalmente como norma ISO/IEC 40500:2025. Eso no cambia ni una regla técnica, pero sí cambia su peso como señal: una declaración de conformidad WCAG 2.2 AA ya no es solo "buena práctica de accesibilidad" — es conformidad con una **norma ISO citable**, exactamente el tipo de credencial factual y verificable que la Parte 1.3 del documento base identificó como la pieza que le falta a ArteMichiko frente a Atelier México. Ver Parte 26.1.

---

# PARTE 23 — El framework GEO/AEO/LLMO, corregido con datos de terreno

La Parte 18 del documento anterior construyó bien el mapa de ocho macro-áreas — ese mapa no se toca. Lo que sí necesita corrección son dos piezas concretas donde, entre la teoría razonable de cuando se escribió y la evidencia medida de mediados de 2026, apareció una brecha real.

## 23.1 `llms.txt`: de "acción de mayor apalancamiento" a "gesto de bajo costo sin evidencia de efecto"

La Parte 20 (acción #25) recomendaba publicar `llms.txt`/`llms-full.txt` como "práctica de bajo costo y alto apalancamiento". La primera mitad de esa frase sigue siendo cierta. La segunda, con los datos disponibles en agosto de 2026, no:

- Estudios de adopción sobre cientos de miles de dominios ubican la adopción real entre 2% y 10%, según la metodología — y entre los sitios con mayor tasa de citación por IA del mercado, casi ninguno lo tiene.
- Mediciones de tráfico de rastreadores de IA en ventanas de 90 días muestran que `llms.txt` recibe una fracción marginal —del orden de una décima de punto porcentual— del tráfico total de bots de IA sobre un dominio; los rastreadores de respuesta directa (los que alimentan ChatGPT, Perplexity, Gemini) mayoritariamente ignoran el archivo y rastrean el HTML igual que siempre.
- Google lo dijo sin ambigüedad: ningún sistema de Search ni de AI Overviews usa `llms.txt`, y la comparación oficial de la propia Google es con la etiqueta `keywords` — la señal que la industria dejó de confiar hace quince años precisamente porque era autodeclarada y no verificable.
- Ninguno de los laboratorios grandes (OpenAI, Google, Anthropic, Meta, Perplexity, Mistral) confirma en público que sus sistemas de producción lean o actúen sobre el archivo.

Donde sí hay evidencia real de uso es en un caso distinto al que motivaba la recomendación original: asistentes de código (Cursor, Continue, integraciones MCP) que un desarrollador apunta explícitamente a la documentación de una herramienta para traer contexto limpio a una sesión de trabajo. Eso es un caso de uso *bajo demanda del propio usuario técnico*, no de descubrimiento por un rastreador que decide qué citar — y no es el caso de uso de una academia de arte.

**Ajuste, no eliminación:** sigue teniendo sentido publicar `llms.txt` — cuesta prácticamente nada, no puede hacer daño, y la adopción podría cambiar. Pero se reclasifica: deja de ser la acción #25 de "mayor apalancamiento" y pasa a ser una tarea de higiene técnica de bajo costo, sin promesa de efecto medible en citación de IA. El presupuesto de atención que la Parte 20 le asignaba se reasigna al punto siguiente, que sí tiene evidencia de funcionar.

## 23.2 De estrategia teórica a medición real: Cloudflare AI Crawl Control

La Parte 15 (#6, documento base) ya advertía el riesgo correcto: "sin medir, la estrategia GEO es completamente teórica". La solución que hoy existe, dentro del mismo proveedor ya elegido, es **Cloudflare AI Crawl Control** — parte del mismo panel de Cloudflare que ya gestiona DNS, Workers e Images para este proyecto. Permite ver, con datos reales de servidor y no con inferencia indirecta, qué rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, y el resto) visitan el sitio, con qué frecuencia y sobre qué páginas — el proceso de medición mensual que la acción #6 pedía, ahora con una fuente de datos concreta y sin coste adicional, en vez de depender de inferir citaciones de forma indirecta.

## 23.3 Cloudflare AI Search adelanta trabajo que el roadmap ponía en Fase 4

La Parte 15 (#11, documento base) ya identificaba activar "Cloudflare AI Search sobre el CMS" como acción de apalancamiento. Desde marzo de 2026 el producto (antes llamado AutoRAG) tiene **endpoints públicos, componentes de UI listos para incrustar y soporte de MCP** — lo que en la práctica significa que construir un buscador conversacional del propio sitio, indexado sobre el contenido real de Payload, ya no es un proyecto de ingeniería de meses: es configuración de un producto gestionado. Esto adelanta con mucho menos esfuerzo del previsto una pieza que la Fase 4 del roadmap (Parte 14, documento base) reservaba para el "docente conversacional IA" — con la ventaja adicional de que, al vivir en el mismo proveedor, no introduce ni una cuenta de facturación nueva ni una superficie de seguridad adicional que auditar.

## 23.4 Lo que no cambia

El resto del framework de la Parte 18 sigue de pie: la prioridad de `FAQPage` con preguntas reales (18.2, macro-área 4) sigue siendo, con evidencia, el dato estructurado de mayor impacto de citación — eso no lo desmiente ningún dato de 2026, y ahora tiene además un canal de distribución natural: el propio widget de AI Search puede responder usando ese mismo contenido `FAQPage`.

---

# PARTE 24 — Datos y contenido: cómo Payload y Astro se hablan

Con Astro como meta-framework (Parte 21), la relación entre Payload CMS y el frontend cambia de forma, no de fondo:

```
CONTENIDO ESTABLE (Docentes, Nosotros, Legal, páginas de curso ya
publicadas, entradas de blog)
    → Astro Content Layer API, loader personalizado sobre la API de
      Payload, resuelto en tiempo de construcción → HTML estático,
      cero JS, indexable sin excepción (mantiene intacto el
      no_js_fallback de la Parte 2.1)

CONTENIDO QUE CAMBIA SIN RECONSTRUIR TODO EL SITIO (catálogo de
cursos, precios si se opta por la vía transparente de la Parte 19.8,
disponibilidad de cupo)
    → Live Content Collections (Astro 6, estable desde marzo de 2026)
      — el equipo de ArteMichiko publica un cambio en Payload y se
      refleja sin esperar al siguiente despliegue completo

CONTENIDO PERSONALIZADO O DEPENDIENTE DE SESIÓN (ficha
"pre-llenada" de matriculación, recomendación basada en
interest_vector)
    → Server Islands sobre Payload/D1, exactamente el patrón que
      resuelve la objeción original de la Parte 17 hacia Astro (21.2)
```

Payload sigue viviendo en Cloudflare Containers, sin cambios respecto a la Parte 17.2 — la única diferencia es quién lo consume del otro lado.

---

# PARTE 25 — Seguridad, calidad y observabilidad

La Parte 17 resolvió stack; no llegó a especificar cómo el equipo sabe que el sitio sigue sano después de publicarlo. Esta pieza faltaba por completo.

## 25.1 Seguridad

- **CSP con hashing automático:** capacidad nativa de Astro 6 (22.1) — cabeceras de seguridad de contenido sin mantenimiento manual de hashes cada vez que cambia un script.
- **Cloudflare Turnstile** en el formulario de matriculación y en cualquier punto de captura: CAPTCHA invisible, sin la fricción de un desafío visual roto — coherente con el principio de *omotenashi* que la Parte 2.3 del documento base ya fija como regla de conversión ("el sistema nunca pide más de lo necesario").
- **Rate limiting a nivel de Worker** sobre el canal de WhatsApp/CRM edge-native — protege el activo que la Parte 15 (#15, documento base) ya identificaba como el más crítico de monitorear.
- SPF/DKIM/DMARC: sin cambios, ya fijado como acción #21 en la Parte 15 del documento base — se reafirma aquí como requisito de lanzamiento, no de fase posterior.

## 25.2 Calidad

- **Playwright** para pruebas end-to-end de los dos flujos que de verdad no pueden fallar en producción: matriculación completa y filtrado de galería sin recarga.
- **Vitest** para unidades — mismo ecosistema Vite que ya usa Astro internamente, sin herramienta adicional que aprender.
- Ambas como *gate* obligatorio antes de cada despliegue, no como práctica opcional de "cuando haya tiempo".

## 25.3 Observabilidad

- **Cloudflare Web Analytics** como medición por defecto: no usa cookies, no requiere banner de consentimiento para funcionar, y encaja mejor con el espíritu de la LFPDPPP post-reforma que la Parte 6 del documento base ya toma en serio. GA4 queda como opción complementaria, no como base, si en algún momento se necesita una integración de marketing específica que lo requiera.
- **Web Vitals real (RUM)** reportado desde el propio navegador del visitante hacia Cloudflare Analytics Engine — mide LCP/INP/CLS de campo, no solo de laboratorio, cerrando el objetivo que la propia Parte 18.2 ya fijaba (LCP < 2.5s, INP < 200ms, CLS < 0.1) con datos reales en vez de una promesa de diseño.
- **Sentry** para monitoreo de errores en producción — no es una elección al azar: Sentry es uno de los socios nombrados del Astro Ecosystem Fund, con lo que la integración entre ambos ya viene cuidada por el mismo ecosistema.

---

# PARTE 26 — Funcionalidades y secciones que la Parte 19 no contemplaba

La Parte 19 del documento anterior fue exhaustiva con las páginas ya identificadas. Quedan fuera piezas que sí importan para posicionamiento, confianza y retención.

## 26.1 Página de Accesibilidad / declaración de conformidad

No es solo cumplimiento — es la credencial más barata y más rápida de conseguir de todas las que la Parte 1.3 del documento base identifica como necesarias. Una declaración pública de conformidad WCAG 2.2 AA, citando explícitamente el reconocimiento ISO/IEC 40500:2025 (22.3), es un hecho verificable que un motor de IA puede citar con la misma confianza factual que hoy le da a la certificación ARC de Atelier México — y a diferencia de una alianza institucional o una certificación de instructor, no depende de ningún tercero: se construye con el propio trabajo de ingeniería que ya hay que hacer para cumplir WCAG 2.2 de todas formas.

## 26.2 Boletín / lista de correo propia

Facebook, Instagram y TikTok (el punto de partida real del proyecto, según el documento base) son canales alquilados: su alcance depende de un algoritmo que ArteMichiko no controla. Una lista de correo propia, capturada con el mismo progressive profiling de la Matriculación (Parte 2.3) y enviada con la infraestructura de correo ya asegurada por SPF/DKIM/DMARC (25.1), es el único canal de los que existen hoy que la academia posee por completo.

## 26.3 Comunidad de alumni

Alimenta directamente el mecanismo de retención y reseñas post-curso que la Parte 15 (#12, documento base) ya identificaba como el combustible real que le falta al SEO local diseñado en la Parte 5. Una página simple de reconocimiento de egresados, con su obra y su testimonio, no requiere infraestructura nueva — reutiliza el mismo modelo de datos de `Artwork` y `Testimonial` ya definido.

## 26.4 Vales de curso / tarjetas de regalo

Oportunidad de conversión estacional directa (aniversarios, fin de año) que ninguna de las academias auditadas en la Parte 1.3 explota. Se apoya en el mismo checkout de Stripe ya decidido en la Parte 7.2 del documento base para pagos internacionales — no es infraestructura nueva, es un tipo de producto nuevo sobre infraestructura existente.

## 26.5 Kit de prensa / medios

Pieza que la macro-área 6 de la Parte 18 (Authority & Distribution) señala como débil en todo el proyecto hasta ahora. Una página con biografía institucional, fotografía de alta resolución con licencia clara de uso editorial, y datos factuales verificables (los mismos que alimentan Entity & Brand) reduce la fricción de cualquier periodista o creador de contenido que quiera cubrir a ArteMichiko — y es, otra vez, el tipo de contenido que un sistema de IA generativa cita con más confianza que copy de marketing.

## 26.6 Lista de espera para cursos con cupo lleno

Captura demanda que hoy se pierde sin registro. Requiere solo un estado adicional en el modelo de datos de `CourseInstance` (ya existente, Parte 17.2) y una plantilla de WhatsApp Business ya contemplada en la auditoría de plantillas (acción #9, Parte 15 del documento base).

## 26.7 Portal de alumno — evaluación deliberada, no automática

A diferencia de las piezas anteriores, esta se documenta pero **no se recomienda para la Fase 1.** Un portal con progreso de curso, materiales descargables y mensajería directa es valioso, pero es exactamente el tipo de superficie con estado persistente y autenticación que justificaría, si creciera lo suficiente, revisar de nuevo si Astro sigue siendo la elección correcta para esa sección específica (podría vivir como una isla de aplicación más pesada, o incluso como una sub-aplicación Next.js dedicada solo a esa función, sin que eso obligue a rehacer el resto del sitio). Se marca como decisión de Fase 3–4, no de lanzamiento.

---

# PARTE 27 — Motion design: presupuesto y accesibilidad de la animación

La Parte 17.4 definió qué tecnología anima cada pieza. Falta la disciplina que evita que "cutting-edge" se convierta en "pesado":

- **Presupuesto de animación por tipo de página:** el Umbral y la Galería pueden permitirse las secuencias complejas de GSAP porque son, por diseño, el punto de la experiencia donde el visitante espera invertir atención. Blog, Docentes, FAQ y Legal deben limitarse a las animaciones nativas de 22.1 (`view()`) — ninguna de esas páginas necesita ni debe cargar GSAP.
- **Gestos táctiles en la Galería en móvil:** swipe entre obras como alternativa nativa al scroll vertical cuando la pieza se ve en formato horizontal — mismo `FilterEngine`, gesto adicional, sin librería de gestos completa si la Pointer Events API nativa basta para el caso de uso.
- **`prefers-reduced-motion`:** la Parte 3.1 del documento base ya lo fija sin excepción — aquí se extiende explícitamente a las animaciones nativas de CSS de 22.1, no solo a GSAP: `animation-timeline` respeta la misma media query con la misma disciplina.
- **Modo oscuro — recomendación de posponer, con criterio explícito:** "Barro y Tinta" está calibrado como una paleta cálida de superficie clara (hueso/arena) con acentos restringidos; invertir eso automáticamente por token suele producir un modo oscuro "sucio" que ninguna paleta cálida resiste bien sin curaduría manual. Recomendación: no construir un modo oscuro automático en la Fase 1. Si en fases posteriores se justifica por demanda real, diseñarlo como una variante curada a mano ("sala nocturna"), no como una inversión matemática de los mismos tokens.

---

# PARTE 28 — Cómo esto entra al roadmap y nuevas acciones de mayor apalancamiento

Todo lo anterior se inserta en las fases ya definidas (Parte 14, documento base) sin reordenarlas: la arquitectura de la Parte 21 es la base técnica de la Fase 1 (MVP) — reemplaza la base técnica que la Parte 17 le daba a esa misma fase, no añade una fase nueva. Las capacidades nativas de la Parte 22 se adoptan desde el primer commit, porque no cuestan nada adoptarlas desde el principio y cuestan reescritura si se añaden después.

**Nuevas acciones de mayor apalancamiento** (continúan la numeración de la Parte 20):

| # | Acción | Por qué importa | Costo/Complejidad | Si no se hace |
|---|---|---|---|---|
| 29 | Adoptar Astro 6 + adaptador nativo de Cloudflare Workers como base del MVP, en vez de Next.js | Un solo proveedor real para framework, edge, contenedores, imágenes y búsqueda IA; paridad dev/prod total; JS cero por defecto en el 85% del sitio | Medio — es una decisión de arranque, no una migración | Se construye sobre un framework que exige disciplina activa para lograr lo que el otro entrega por diseño, y se fragmenta el proveedor que el resto del stack ya había consolidado |
| 30 | Definir el estado compartido entre islas (interest_vector, readiness_score, FilterEngine) con nanostores antes de escribir la primera isla | Evita que cada isla reinvente su propio manejo de estado | Bajo | Estado duplicado o sincronizado a mano entre Umbral, Galería y Matriculación |
| 31 | Reclasificar `llms.txt` de "acción de apalancamiento" a tarea de higiene técnica sin promesa de efecto medible | Evita invertir presupuesto de atención en una señal sin evidencia de impacto en 2026 | Bajo, es solo una recalibración de expectativa | Se mide el éxito de la estrategia GEO contra un indicador que no se mueve, y se concluye erróneamente que la estrategia falló |
| 32 | Activar Cloudflare AI Crawl Control desde el lanzamiento | Reemplaza la medición GEO teórica (acción #6, Parte 15) con datos reales de qué rastreadores de IA visitan qué páginas | Bajo, ya incluido en el proveedor elegido | Se sigue sin saber, con datos reales, si la estrategia de citación de IA funciona |
| 33 | Publicar la declaración de conformidad WCAG 2.2 AA (ISO/IEC 40500:2025) como página propia, no solo como práctica interna | Es la credencial verificable más barata y rápida de las que la Parte 1.3 exige — no depende de terceros | Bajo, es documentar trabajo que hay que hacer de todas formas | Se pierde la credencial más accesible de cerrar la brecha frente a Atelier México |
| 34 | Definir el presupuesto de animación por tipo de página antes de que el equipo de diseño produzca motion para todas las páginas por igual | Evita que GSAP se cargue en páginas que no lo necesitan | Bajo, es una regla de gobernanza, no ingeniería | El "cutting-edge" bien pensado en Umbral/Galería se filtra sin criterio al resto del sitio y penaliza Core Web Vitals donde no había razón para pagar ese costo |
| 35 | Decisión explícita de posponer modo oscuro automático a fase posterior | Evita construir una variante de marca que probablemente salga "sucia" sin curaduría manual | Bajo, decisión de alcance | Se invierte tiempo de diseño en una variante que luego hay que rehacer a mano de todas formas |

## Cierre

La Parte 0 del documento base decía que ArteMichiko no tiene que alcanzar a nadie en tecnología o experiencia — que ya los supera a todos en ese eje. La Parte 17 lo tradujo a un stack cerrado y razonado. Este documento no cambia esa tesis ni la mayoría de esas decisiones — las hereda casi intactas. Lo único que cambia es la capa que las envuelve, y cambia por una razón que no existía cuando se escribió la Parte 17: el proveedor de infraestructura que este proyecto ya había elegido, por sus propios méritos, en enero de 2026 se convirtió también en el dueño del framework de frontend que mejor sirve un sitio mayoritariamente editorial. Ignorar ese dato habría sido la única forma de que este documento fallara en su encargo: no complacer la elección anterior, sino tomar la mejor decisión posible con la información que existe hoy.

---

### Fuentes consultadas (agosto 2026)

- Cloudflare — comunicado de adquisición de Astro (cloudflare.com/press/press-releases/2026, 16 de enero de 2026) y cobertura independiente (ITBrief, TechAfrica News, DEVOPSdigest, GIGAZINE)
- Astro — astro.build/blog/astro-5 y astro.build/blog/joining-cloudflare; changelog de Astro 6.0 (Live Content Collections, CSP API, Fonts API, workerd dev server)
- Next.js — nextjs.org/blog/next-16-3 y notas de Instant Navigations, Turbopack y mejoras de IA (agosto de 2026)
- Cloudflare Developers — changelog de Containers/Sandboxes GA (13 de abril de 2026) y de AI Search (23 de marzo de 2026, endpoints públicos/MCP)
- MDN y CSS-Tricks/DEV Community — estado de soporte de CSS Scroll-Driven Animations, OKLCH, Popover API, Container Queries, Speculation Rules API (mediados de 2026)
- W3C — estado de WCAG 2.2 como ISO/IEC 40500:2025 (octubre de 2025) y borrador de trabajo de WCAG 3.0 (septiembre de 2025)
- Cobertura independiente sobre adopción y uso medido de `llms.txt` en 2026 (SE Ranking/LinkBuildingHQ, OtterlyAI, Profound, Limy, DigitalApplied, declaraciones públicas de Google/John Mueller y Gary Illyes)
- Meta for Developers — cambios de precio de WhatsApp Business API de octubre de 2026 (cobertura de SleekFlow, GREEN-API, NordFlux, RevoplyAI)
- Comparativas independientes Payload CMS vs. Directus vs. Strapi 2026 (13Labs, Mobian Studio, FocusReactive, ElmapiCMS)
