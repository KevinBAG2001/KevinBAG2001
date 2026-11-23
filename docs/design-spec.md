# Design spec — GitHub profile README (Kevin Austria Galvan)

Referencia de método: [MotionSites Web Builder](https://github.com/Motionsites-AI/claude-skill) (spec antes de construir, assets coherentes, ciclo captura → crítica → corrección).

Alcance: solo lo que GitHub renderiza (Markdown, HTML limitado, `<img>` con SVG/GIF). Una sola animación. Resto estático.

## Concepto

Editorial técnico sobrio: base grafito tipo noche urbana, acento rojo intenso, azul profundo como soporte y un toque morado puntual (solo color, sin referencias a franquicias). Tipografía sans de peso medio. **Bilingüe parejo:** bloque EN y bloque ES con la misma jerarquía, assets espejo (`hero-es`, tarjetas `-es`) y copy equivalente en español latinoamericano natural.

## Tokens de color

| Token | Oscuro (GitHub dark) | Claro (GitHub light) | Uso |
| --- | --- | --- | --- |
| `bg` | `#0B0B10` | `#f8fafc` | Fondo de hero y lienzo oscuro |
| `card` | `#14151D` | `#ffffff` | Tarjetas y banda de stats |
| `fg` | `#f1f5f9` | `#0f172a` | Titulares y cuerpo |
| `fg-muted` | `#94a3b8` | `#475569` | Subtítulos, etiquetas |
| `accent-primary` | `#E23636` | `#E23636` | Animación (tramo rojo), punto de separador, badge Portfolio |
| `accent-secondary` | `#2B59C3` | `#1E3A8A` | Reglas, bordes de tarjeta, flechas |
| `accent-purple` | `#7C3AED` | `#7C3AED` | Un solo detalle en hero (punto 2px) |
| `border` | `rgba(43,89,195,0.22–0.28)` | `rgba(30,58,138,0.12–0.14)` | Marcos de tarjetas |

Alineado con tokens de `portfolio/css/style.css` y gradientes del README de GitLab en este repo.

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
- **R3 (ES):** el bloque `<details>` resumía el perfil; se reemplazó por sección **Perfil en español** espejo (hero, tarjetas, tablas, stats, contacto) con assets `*-es`.
- **R4 (ES QA):** fechas de stats sincronizadas vía workflow bilingüe; copy LATAM (“llevar a producción”, “en curso”).