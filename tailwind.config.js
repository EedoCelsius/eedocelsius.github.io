import primeui from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './playground/index.html',
    './playground/src/**/*.{vue,js,ts,jsx,tsx}',
    './library/**/*.{vue,js,ts,jsx,tsx}',
  ],
  // Tailwind JIT normally tree-shakes unused utilities. Keep everything available
  // so the playground can experiment with any class without rebuilding.
  safelist: [{ pattern: /.*/ }],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Noto Sans KR"', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [primeui],
}
