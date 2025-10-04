# Component Lab

Component Lab is a personal PrimeVue-driven playground for building, testing, and documenting reusable Vue components. It ships with Tailwind CSS, vue-i18n, and Vue Router so every component can be explored with live property controls and localized copy (English and Korean).

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Every push to the `main` branch triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
