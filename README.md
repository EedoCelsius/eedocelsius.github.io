# Component Lab

Component Lab is a calm PrimeVue-powered playground for exploring reusable Vue components with live controls, multi-language support (English and Korean), and an optional dark theme. It is optimised for GitHub Pages and ships with automated deployments through GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

Visit <http://localhost:5173> to open the playground.

### Building for production

```bash
npm run build
npm run preview
```

The build command runs type checks via `vue-tsc` before emitting the production bundle in `dist/`.

## Project structure

```
src/
├── App.vue              # Shell with header, router view, and footer
├── components/          # Library components and shared controls
├── composables/         # Theme composable for dark/light mode handling
├── locales/             # Vue I18n configuration and translations
├── modules/             # Component registry used by the playground
├── router/              # Vue Router configuration
├── styles/              # Global design tokens and resets
└── views/               # Application pages (overview + playground)
```

## Adding new components

1. Create your Vue component in `src/components`.
2. Register it in `src/modules/componentRegistry.ts` with:
   - A unique `id`
   - Translation keys for its name/description
   - Default props and control metadata (text, number, color, textarea)
3. Add the matching translations in `src/locales/en.ts` and `src/locales/ko.ts`.

The playground automatically renders the new component and exposes its controls based on the registry definition.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site on pushes to the `main` branch and publishes the output to the `gh-pages` branch using the official Pages actions. Ensure Pages is configured to deploy from the GitHub Actions workflow in repository settings.
