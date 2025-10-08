import primeui from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './playground/index.html',
    './playground/src/**/*.{vue,js,ts,jsx,tsx}',
    './library/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['"Noto Sans KR"', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [primeui],
}
