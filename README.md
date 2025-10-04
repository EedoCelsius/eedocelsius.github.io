# Experience Design Library

This repository contains an interactive component library built with [Vue 3](https://vuejs.org/), [PrimeVue](https://primevue.org/), [Vue Router](https://router.vuejs.org/) and [Vue I18n](https://vue-i18n.intlify.dev/). The site is hosted on GitHub Pages and includes playgrounds for testing customer experience components with configurable props.

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` – start the Vite development server.
- `npm run build` – type-check the project and generate a production build in `dist/`.
- `npm run preview` – preview the production build locally.

## Project structure

- `src/component-registry` – single source of truth for all library components and their default props.
- `src/components/library` – actual component implementations ready to be consumed by products.
- `src/components/playgrounds` – reusable playground scaffolding plus component-specific playgrounds.
- `src/pages` – routed views for the home page, component gallery, detail views, and 404 page.
- `src/i18n` – locale messages and initialisation for Vue I18n.

## Adding a new component

1. Create the component under `src/components/library/<feature>/<ComponentName>.vue`.
2. Build an accompanying playground component inside `src/components/playgrounds` using `ComponentPlayground.vue` for form controls and preview.
3. Register the component in `src/component-registry/index.ts` with metadata, default props, and a lazy-loaded playground module.
4. Provide i18n strings in both `src/i18n/messages/ko.ts` and `src/i18n/messages/en.ts` using the `components.<componentKey>` namespace.

The router and gallery consume the registry automatically, so the new component will appear without additional wiring.

## Deployment

The project is deployed via GitHub Actions. Every push to the `main` branch runs the workflow in `.github/workflows/deploy.yml`, which builds the site and publishes the static files to GitHub Pages.
