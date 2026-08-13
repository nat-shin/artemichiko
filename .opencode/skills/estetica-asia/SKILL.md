---
name: estetica-asia
description: Estética asiática aplicada al diseño de ArteMichiko — sumi-e (tinta china), wabi-sabi (imperfección), Ma (espacio negativo), kintsugi (reparación dorada), Shu-Ha-Ri (maestría). Reglas concretas de generación para interfaces y contenido, no vibes.
license: Propietario — ArteMichiko
---

# Estética Asia — Reglas de Diseño para ArteMichiko

> Complementa `barro-y-tinta`. Codifica filosofía estética asiática como decisiones de diseño accionables.

## 間 Ma — Espacio negativo como poder

- El vacío es parte del diseño, no relleno que sobra.
- **Test**: si al quitar un elemento la composición gana, se quita.
- En galería: dejar respirar cada obra — una pieza, un momento (一期一会, ichigo-ichie).

## 侘寂 Wabi-sabi — Imperfección deliberada

- Texturas de barro no uniformes: variación sutil de grano, bordes que no son perfectamente rectos.
- Asimetría intencional en layout (offset de títulos, grillas que no se alinean del todo).
- Estados vacíos y 404: tratados como "juntas doradas" (kintsugi) — el error es parte de la belleza, con sello rojo de firma.

## 水墨 Sumi-e — Tinta china como acento

- Trazo gestual: SVG/CSS de pincelada con variación de grosor (no líneas uniformes de vector).
- Gradación de tinta: de negro profundo a gris hielo como escala de jerarquía (tinta-negra → tinta-hielo de `barro-y-tinta`).
- El trazo aparece como: subrayado de títulos, divisor de sección, marco de obra, firma.

## 守破離 Shu-Ha-Ri — Estructura de maestría

- **Shu (守)**: seguir las reglas — cursos fundamentales, plantillas base.
- **Ha (破)**: romper las reglas — experimentación, técnicas intermedias.
- **Ri (離)**: crear lo propio — obra original, voz personal.
- Aplicar como metáfora del currículum de la academia (rutas de aprendizaje) y en la jerarquía visual de la home.

## 印章 Sello de tinta roja

- El sello (cinabrio `#C3272B`) es la firma: aparece en logo, firma de artista, CTA primario, estado de éxito.
- Nunca más de un sello visible por pantalla (un acento, una voz).

## Reglas de generación (accionables)

1. **Asimetría**: offset de 4-8px en títulos vs cuerpo; grillas con una celda desplazada.
2. **Textura**: arcilla/washi/fibra via CSS/SVG sutil (noise + grano), nunca foto stock.
3. **Trazo**: pincelada SVG con `stroke-linecap="round"` y grosor variable; 1-2 acentos por página.
4. **Espacio**: padding de sección amplio (min 6rem desktop); no llenar.
5. **Jerarquía tinta**: negro (título) → gris (texto) → hielo (metadata) — misma familia, distinto peso.
6. **Reduced motion**: si `prefers-reduced-motion`, los trazos/tinta aparecen estáticos (fade suave).

## Anti-patrones

- Simetría perfecta de plantilla · Texturas 3D de software · Sombras duras · Neón · Densidad de SaaS · Relleno sin propósito.
