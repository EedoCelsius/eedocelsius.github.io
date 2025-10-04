/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#e6ecff',
          200: '#ccd9ff',
          300: '#a4bbff',
          400: '#7694ff',
          500: '#4f6bff',
          600: '#3b53db',
          700: '#2f40ac',
          800: '#283788',
          900: '#212d6b'
        }
      }
    }
  },
  plugins: []
};
