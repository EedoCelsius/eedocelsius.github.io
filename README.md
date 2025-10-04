# Component Playground

Component Playground is a Vue 3 + PrimeVue powered laboratory for building and testing private UI components. It ships with routing, internationalisation (한국어/English), and a theme-aware layout that mirrors the production experience of deep link flows.

## ✨ Features

- **PrimeVue stack** with Aura theme and PrimeFlex utilities.
- **Vue Router** driven playground routes so every component can have an isolated testing surface.
- **Vue I18n** with Korean and English translations for the shell and demo content.
- **Dark / light theme toggle** wired to CSS variables and PrimeVue's theme system.
- **Deep Link Experience component** that simulates mobile/desktop flows with QR code fallback.
- **GitHub Actions workflow** for automatic deployment to GitHub Pages.

## 🧱 Project structure

```
src/
 ├─ components/
 │   └─ playground/        # Reusable playground-ready components
 ├─ data/
 │   └─ componentCatalog.js
 ├─ i18n/
 ├─ router/
 └─ views/
     ├─ HomeView.vue
     └─ playgrounds/
         └─ DeepLinkExperienceView.vue
```

Add new playgrounds by creating a component under `src/components/playground`, a corresponding view in `src/views/playgrounds`, and registering its route in `src/router/componentRoutes.js` and catalogue entry in `src/data/componentCatalog.js`.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:5173> in your browser. The development server supports hot module replacement.

To generate a production build:

```bash
npm run build
```

Preview the output locally with:

```bash
npm run preview
```

## 📦 Deployment

The repository includes `.github/workflows/deploy.yml`, which builds the site on pushes to `main` and deploys the generated `dist/` folder to GitHub Pages.

## 🗣️ Internationalisation

Locale strings live in `src/i18n/index.js`. The language switcher in the header updates Vue I18n dynamically. Add new languages by extending the `messages` object and the `locales` array inside `App.vue`.

## 🎨 Theming

PrimeVue uses the Aura theme with the dark variant driven by the `.dark-theme` selector. Custom CSS variables in `src/style.css` align the layout with the selected theme. Extend or override the styling by editing this file or using PrimeVue's CSS utility classes.
