/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light color pallette
        'primary': '#7586ec',
        'primary-dark': '#5e6bbd',
        'accent': '#9eaaf2',
        'secondary': '#ff7b1c',
        'secondary-accent': '#ffcaa4',
        'third': '#48D1D0',
        'third-accent': '#b6edec', 
        'body': '#FFFFFF',
        'body-accent': '#f9f9fb',
        'body-accent-secondary': '#F0F2F5',
        'black': '#0c0d18',
        'black-accent': '#989898',
        'gray': '#b8b9c1',

        // Dark color pallette
        'd-body': '#0c0d18',
        'd-body-accent': '#101321',
        'd-body-accent-secondary': '#171b2f',
        'd-black': '#0c0d18',
        'd-gray': '#b8b9c1',
        'd-white': '#CECCD5',
        'd-white-accent': '#7E7C86',
      }
    },
  },
  plugins: [],
}