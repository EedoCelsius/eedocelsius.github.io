module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f9ff',
          100: '#e0ebff',
          200: '#c7dcff',
          300: '#9ec2ff',
          400: '#6c9bff',
          500: '#3f6efd',
          600: '#2a4be0',
          700: '#1e39b3',
          800: '#1b3390',
          900: '#1a2e75'
        }
      }
    }
  },
  plugins: []
};
