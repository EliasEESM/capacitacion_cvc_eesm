# Formación Técnica · Mediciones Especiales y Capacitación CVC

Plataforma web modular de capacitación construida con arquitectura **Core + Módulos** lista para desplegar en **GitHub Pages**.

## Estructura del Proyecto

```text
plataforma-capacitacion-cvc/
├── .nojekyll
├── index.html                        # Portal principal (2 módulos activos + 2 Próximamente)
├── assets/
│   └── logo.png                      # Logotipo institucional CVC de Occidente
├── core/
│   ├── theme.css                     # Sistema visual maestro (#007e75, Bento Grid, Modales)
│   └── engine.js                     # Motor compartido de tarjetas, flashcards y taller
└── modulos/
    ├── 01-tcm/                       # Módulo 01: Temperatura Cinética Media (activo)
    │   ├── index.html
    │   ├── tcm-animations.js
    │   └── tcm-data.js
    └── 02-politicas-cvc/             # Módulo 02: Políticas y Objetivos CVC 2026 (activo)
        ├── index.html
        ├── css/ (main.css, layout.css, components.css, portal-bridge.css)
        ├── img/logo.png
        └── js/ (data.js, game.js, ui.js, app.js)
```

## Publicación en GitHub Pages

1. Extrae este `.zip` y sube el contenido interno de `plataforma-capacitacion-cvc/` a la raíz de tu repositorio en GitHub (rama `main`).
2. En **Settings → Pages**, selecciona `Deploy from a branch` → `main` / `/ (root)`.
