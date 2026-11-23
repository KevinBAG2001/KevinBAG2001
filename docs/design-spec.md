# Design spec — GitHub profile README (Kevin Austria Galvan)

Referencia de método: [MotionSites Web Builder](https://github.com/Motionsites-AI/claude-skill) (spec antes de construir, assets coherentes, ciclo captura → crítica → corrección).

Alcance: solo lo que GitHub renderiza (Markdown, HTML limitado, `<img>` con SVG/GIF). Una sola animación. Resto estático.

## Concepto

Editorial técnico calmado: superficie cálida sobre negro profundo, acento verde-teal discreto, tipografía sans de peso medio. El hero comunica identidad en un solo panel; las métricas son datos reales en una banda tipográfica; los proyectos destacados son tarjetas enlazables, no muros de badges.

## Tokens de color

| Token | Oscuro (GitHub dark) | Claro (GitHub light) | Uso |
| --- | --- | --- | --- |
| `bg` | `#0a0a0a` | `#f7f5f0` | Fondo de SVGs (transparente donde el tema de GitHub pinta el canvas) |
| `fg` | `#E8E6DC` | `#111411` | Titulares y cuerpo |
| `fg-muted` | `#9a9a9a` | `#6F6F6F` | Subtítulos, etiquetas |
| `fg-faint` | `rgba(232,230,220,0.45)` | `rgba(17,20,17,0.42)` | Metadata, índices |
| `accent` | `#0f766e` | `#0d9488` | Una sola línea animada, puntos, énfasis mínimo |
| `accent-soft` | `rgba(15,118,110,0.35)` | `rgba(13,148,136,0.28)` | Resplandor de la animación |
| `border` | `rgba(255,255,255,0.12)` | `rgba(0,0,0,0.08)` | Marcos de tarjetas |
| `card` | `#101010` | `#fcfcfc` | Relleno de tarjetas en SVG |

Regla: un acento, máximo tres tipos de elemento (línea animada, punto de sección, borde activo en hover implícito del asset).

## Tipografía (SVG / Markdown)

| Rol | Familia | Peso | Tamaño (desktop SVG) | Tracking |
| --- | --- | --- | --- | --- |
| Display | `system-ui, -apple-system, "Segoe UI", sans-serif` | 500 | 28–32px | −0.03em |
| Eyebrow | idem | 600 | 11px, uppercase | +0.22em |
| Body | idem | 400 | 14–15px | −0.01em |
| Label / stat | idem | 500 | 10–12px | +0.12em |
| Stat number | idem | 300 | 36–44px | −0.025em |

Escala: el nombre en hero ≈ 5× el cuerpo del tagline.

## Espaciado

- Gutter horizontal del hero: 48px (SVG 896px ancho).
- Bloques de sección en README: un `---` + separador SVG de 24px de alto.
- Tarjetas proyecto: 420×168px, radio 24px, padding interno 28px.
- Banda de stats: 896×120px, columnas equidistantes.

## Motion (una sola animación)

**Elemento:** barra de acento en el hero (`assets/readme/hero.svg`).

| Propiedad | Valor |
| --- | --- |
| Tipo | SMIL `animate` en `stroke-dashoffset` + opacidad del glow |
| Duración | 2.4s |
| Iteración | `indefinite` |
| Easing | `keySplines="0.22 1 0.36 1"` (entrada suave tipo MotionSites) |
| Recorrido | sweep horizontal 120px sobre la regla bajo el tagline |
| Reduced motion | SVG estático con dashoffset final (GitHub no expone `prefers-reduced-motion` en `<img>`; el estado reposo muestra la línea al 40% de opacidad fija como fallback visual aceptable) |

Todo lo demás: estático (incl. `stats.svg` regenerado por workflow).

## Componentes

1. `hero.svg` — nombre, rol, tagline, idiomas, regla + animación.
2. `separator.svg` — línea hairline + índice de sección opcional en metadata.
3. `card-abyssan.svg` / `card-bastion.svg` — título, una línea de valor, licencia/stack.
4. `stats.svg` — generado por `scripts/update-readme-stats.mjs` (números API reales).

## QA (rúbrica captura)

| Criterio | Objetivo |
| --- | --- |
| Legibilidad dark/light | Contraste fg/bg ≥ 4.5:1 en textos principales |
| Sin ruido | ≤ 3 badges, sin % lenguajes, sin Pac-Man |
| Jerarquía | Hero → proyectos → trabajo → stack → stats → contacto |
| Datos | Solo métricas del script/workflow |
| Anonimizado | Sin IMSS, Bienestar, Pachuca, OXXO |

## Iteraciones

- **R1 (crítica):** rol duplicado bajo el hero; `separator.svg` con `currentColor` ilegible como `<img>`; brillo de la línea algo fuerte en dark.
- **R2 (corrección):** solo párrafo de valor bajo el hero; separadores dark/light dedicados; etiquetas de stats acortadas (REPOS, COMMITS, …); glow del hero atenuado en `hero.svg`.