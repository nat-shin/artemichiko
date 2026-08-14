---
name: estetica-asia
description: Estética asiática aplicada al diseño de lujo de ArteMichiko — sumi-e (tinta china), wabi-sabi (imperfección), Ma (espacio negativo), kintsugi (reparación dorada), Shu-Ha-Ri (maestría). Reglas concretas para interfaces elegantes blanco/negro/dorado.
license: Propietario — ArteMichiko
---

# Estética Asia — Reglas de Diseño para ArteMichiko (Edición Oro)

> Complementa `barro-y-tinta` y `artemichiko-elegance`. La filosofía asiática aporta la disciplina del espacio y la imperfección deliberada que hacen que el blanco/negro/dorado se sienta como arte, no como template.

## 間 Ma — Espacio negativo como poder

- El vacío ES el diseño de lujo. Los espacios amplios son lo que hace "caro" a una página.
- **Test**: si al quitar un elemento la composición gana, se quita.
- Galería: una obra, un momento (一期一会, ichigo-ichie) — cada pieza respira sola sobre lienzo blanco.

## 侘寂 Wabi-sabi — Imperfección deliberada

- Texturas no uniformes: grano fino, bordes que no son perfectamente rectos.
- Asimetría intencional (offset de títulos 4-8px, grillas con una celda desplazada).
- Estados vacíos y 404: "juntas doradas" (kintsugi) — la reparación es parte de la belleza, con línea de oro.

## 金継ぎ Kintsugi — El oro en la reparación

- La metáfora central del dorado: el oro NO decora — **señala lo valioso**. CTA primario, obra destacada, logro del alumno.
- El oro aparece donde hay mérito: premiación, obra en exposición, momento de transición.

## 水墨 Sumi-e — Tinta china como estructura

- Trazo gestual SVG (grosor variable, `stroke-linecap="round"`) — subrayado de título, divisor, marco de obra.
- Gradación de tinta como jerarquía: `tinta-negra → tinta-grafito → tinta-humo` (de `barro-y-tinta`).
- El trazo es el contraste al oro: negro profundo estructura, oro celebra.

## 守破離 Shu-Ha-Ri — Estructura de maestría

- **Shu (守)**: seguir reglas — fundamentos, plantillas base.
- **Ha (破)**: romper reglas — experimentación, técnica intermedia.
- **Ri (離)**: crear lo propio — obra original, voz personal.
- Aplicar como metáfora del currículum (rutas de aprendizaje) y jerarquía visual de la home.

## 印章 Sello — la firma

- Sello cinabrio `#C3272B` SOLO para firma de artista/obra (no compite con el oro).
- Un sello por pantalla máximo.

## Reglas de generación (accionables)

1. **Asimetría**: offset 4-8px títulos vs cuerpo; grillas con una celda desplazada.
2. **Textura**: grano fino (noise 0.03-0.05) sobre blancos; papel/washi sutil.
3. **Trazo**: pincelada SVG; 1-2 acentos por página; negro = estructura, dorado = celebración.
4. **Espacio**: padding amplio (min 6rem desktop); no llenar jamás.
5. **Jerarquía tinta**: negro (título) → grafito (texto) → humo (metadata).
6. **Oro**: 5-15% cobertura, metálico (gradiente), nunca flat `#FFD700`.
7. **Reduced motion**: trazos/tinta estáticos (fade suave) si `prefers-reduced-motion`.

## Anti-patrones

Simetría de plantilla · Texturas 3D de software · Sombras duras · Neón · Densidad de SaaS · Relleno sin propósito · Oro como relleno · Sobre-decoración.
