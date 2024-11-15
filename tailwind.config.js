/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1450px' },
      'xl': { 'max': '1279px' },
      'lg': { 'max': '1100px' },
      'xlg': { 'max': '1000px' },
      'slg': { 'max': '920px' },
      'mmd': { 'max': '790px' },
      'md': { 'max': '759px' },
      'sm': { 'max': '680px' },
      'ssm': { 'max': '590px' },
      'xsm': { 'max': '450px' },
      'xxsm': { 'max': '370px' },
      'xxxsm': { 'max': '355px' }
    },
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

