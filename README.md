# Component Lab

Component Lab is a calm Vue 3 playground where personal PrimeVue-based components can be designed,
previewed, and exercised with live props. The site is internationalised (English and Korean) and
supports a light/dark theme toggle.

## Stack

- [Vue 3](https://vuejs.org/) with the Composition API
- [Vite](https://vitejs.dev/) for the development/build toolchain
- [PrimeVue](https://www.primefaces.org/primevue/) for UI elements and utilities
- [Vue Router](https://router.vuejs.org/) for navigation between component labs
- [vue-i18n](https://vue-i18n.intlify.dev/) for translations
- [GitHub Actions](https://docs.github.com/actions) for automated GitHub Pages deployments

## Getting started

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173/` by default.

### Type checking & build

```bash
npm run typecheck
npm run build
npm run preview
```

## Project structure

- `src/components/library` – Ready-to-use components (QR code card, blur overlay, loading overlay, link)
- `src/views` – Page-level views including the component playground
- `src/data/componentRegistry.ts` – Registry that powers the playground and makes it easy to append
  more components and their controls
- `src/locales` – English and Korean translation dictionaries
- `.github/workflows/deploy.yml` – GitHub Actions workflow to build and deploy to GitHub Pages

To add a new component, create it inside `src/components/library`, register it inside
`src/data/componentRegistry.ts`, and provide the controls required for the playground.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow that builds the project and deploys
the generated `dist` folder to GitHub Pages.
