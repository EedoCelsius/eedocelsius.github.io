# Component Lab

Component Lab is a personal Vue 3 playground that combines Tailwind CSS, PrimeVue, Vue Router, and Vue I18n. It is designed to grow into a lightweight component library with live playground routes that make it easy to test props and behaviours before reusing components in other projects.

## Getting started

```bash
npm install
npm run dev
```

The development server runs on Vite and will hot-reload changes. Visit `http://localhost:5173` in your browser.

## Available scripts

- `npm run dev` – start a local development server
- `npm run build` – produce the production-ready bundle in `dist`
- `npm run preview` – preview the built bundle locally

## Project structure

- `src/components/lab` – source files for reusable lab components
- `src/lab/registry.js` – central registry that exposes each component, default props, and control definitions
- `src/views/LabView.vue` – playground view that renders component previews and dynamically builds prop controls
- `src/locales` – English and Korean translations consumed by Vue I18n

To add a new component, create the component file inside `src/components/lab`, register it in `src/lab/registry.js` with default props and control metadata, and Vue Router will automatically expose it under `/lab/<component-id>`.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys the site to GitHub Pages on each push to the `work` branch. The workflow installs dependencies, runs the Vite build, and publishes the generated `dist` directory using the Pages deployment actions.

## Technology

- [Vue 3](https://vuejs.org/)
- [PrimeVue](https://primevue.org/) & PrimeIcons
- [Tailwind CSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [Vue I18n](https://vue-i18n.intlify.dev/)
- [Vite](https://vitejs.dev/)

Both English and Korean locales are provided, and a theme toggle persists light/dark preference using local storage.
