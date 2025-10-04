# Component Lab

Component Lab is a calm playground for handcrafted PrimeVue components with bilingual (English/Korean) support, dark mode, and a live props inspector.

## Getting started

```bash
npm install
npm run dev
```

The site is powered by Vite + Vue 3. Visit <http://localhost:5173> during development.

## Available scripts

- `npm run dev` – start the local development server.
- `npm run build` – type-check with `vue-tsc` and create a production build in `dist/`.
- `npm run preview` – preview the production build locally.

## Project structure

```
src/
├── assets/         Global styles and theme tokens
├── components/     Reusable, documented PrimeVue components
├── data/           Component registry metadata for the playground
├── locales/        English and Korean translation files
├── router/         Vue Router configuration
└── views/          Application routes and layouts
```

Add a new component by exporting it from `src/components/index.ts` and registering it inside `src/data/componentRegistry.ts`. The playground UI automatically surfaces metadata, props, and default previews from this registry.

## Deployment

The project is configured for GitHub Pages. A GitHub Actions workflow builds the site with Vite and deploys the generated `dist` folder to Pages on every push to `main`.
