# Eedocelsius Component Library

An extendable Vue 3 component library playground powered by PrimeVue, Vue Router, and Vue I18n. The project is optimized for GitHub Pages and includes automated deployment through GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

The playground is available at `http://localhost:5173`. Navigate to `/preview/<component-slug>` to open the interactive preview for any component. For example, `/preview/deeplink-experience` opens the deeplink UX playground.

## Component architecture

- `src/components/library` – Source of reusable components and the catalog metadata used by the preview router.
- `src/views` – Home dashboard and preview layout used to exercise each component with live props.
- `src/plugins` – PrimeVue and I18n configuration for consistent styling and localization.
- `src/styles` – Shared theme styles and utilities.

To add a new component:

1. Create the Vue component inside `src/components/library/`.
2. Export it from `src/components/library/index.ts` and add a metadata entry to `componentCatalog` with default preview props.
3. The component automatically appears on the home grid and gets its own `/preview/<slug>` route.

## Deeplink Experience component

The initial component demonstrates a deeplink activation flow that:

- Accepts `appName`, `deeplinkUrl`, `icon`, and `timeout` props.
- Exposes a `trigger()` method to open the deeplink.
- Detects desktop vs. mobile and shows a QR-code dialog with the app icon overlay when a desktop visit is detected.
- Displays a loading overlay on mobile for up to the configured timeout and shows an installation dialog if the app does not launch.

## Deployment

Pushes to the `main` branch automatically trigger the `Deploy static content to Pages` GitHub Action. The workflow builds the Vite project and publishes the optimized assets to the `gh-pages` branch for GitHub Pages hosting.
