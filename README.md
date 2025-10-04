# Component Lab

Component Lab is a personal component playground powered by Vue 3, PrimeVue, Vue Router, and Vue I18n. It is designed to make it easy to test reusable UI components with live prop controls and localized content. The project is automatically deployed to GitHub Pages with GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

The development server runs on <http://localhost:5173>. The site supports dark mode and Korean/English localization out of the box.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run type-check` | Run TypeScript checks with `vue-tsc`. |

## Adding new components to the lab

1. Create your component inside `src/components`.
2. Build an accompanying playground wrapper (similar to `DeeplinkExperienceDemo.vue`) that exposes interactive controls.
3. Register the component in `src/components/lab/registry.ts` with localized labels, default prop controls, and a usage snippet. The registry powers routing and control generation, so adding new entries automatically makes them available in the UI.

## Deeplink Experience component

The first component included in the lab demonstrates a deeplink handoff flow:

- Accepts `appName`, `deeplinkUrl`, `icon`, and `timeout` props.
- Exposes a `trigger()` method to attempt the deeplink launch.
- Detects desktop/mobile clients. Desktop users see a QR code with the supplied icon centered inside; mobile users see a loading overlay followed by an install dialog if the deeplink fails.

## Deployment

Every push to the `main` branch runs the **Deploy Component Lab** workflow (`.github/workflows/deploy.yml`). The workflow builds the site with Vite and publishes the `dist` output to GitHub Pages using the latest Pages actions.

## License

This repository is intended for personal use. Use, adapt, or extend it as you like.
