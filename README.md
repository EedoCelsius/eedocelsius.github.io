# Component Lab

Component Lab is a personal component playground powered by **Vue 3**, **PrimeVue**, **Tailwind CSS**, and **Vue I18n**. It runs on GitHub Pages and provides interactive routes for testing each component with live prop controls. The project is structured so that adding new showcase components is straightforward.

## ✨ Features

- 🎨 PrimeVue theme with Tailwind utility styling and dark mode support.
- 🌐 Built-in English and Korean translations.
- 🧩 Component catalog with dynamic playground routes.
- ⚙️ Live prop controls (boolean, slider, color, text, textarea) for quick experimentation.
- 🚀 Automated deployment to GitHub Pages via GitHub Actions.

## 🧱 Current Components

| Component | Description |
| --- | --- |
| QR Code Card | Branded QR card with customizable colors and center icon. |
| Blur Overlay | Glassmorphism overlay with adjustable blur strength. |
| Loading Overlay | Blur overlay paired with a PrimeVue spinner and optional description. |

## 🗂️ Project Structure

```
library/
  components/              # Reusable component implementations and exports

shared/
  color.ts                 # Utilities shared across the library and playground

playground/
  src/
    demos/                 # Playground wrapper components per library component
    library/
      catalog.ts           # Component definitions and control metadata
    views/
      HomePage.vue         # Component list
      ComponentPlayground.vue # Playground with dynamic controls
    i18n/                  # Locale messages
    router/                # Vue Router configuration
```

To register a new component:
1. Create the component under `library/components/` (and export it from `library/components/index.ts`).
2. (Optional) Create a demo wrapper under `playground/src/demos/` if the component needs slot scaffolding.
3. Add an entry to `playground/src/library/catalog.ts` with localized metadata, default props, and control definitions.

## 🚀 Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` and explore components from the home page.

## 🏗️ Production Build

```bash
npm run build
npm run preview
```

## 📦 Deployment

Pushes to the `main` branch trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
