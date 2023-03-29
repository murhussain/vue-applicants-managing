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
        'black': '#0c0d18',
        'black-accent': '#989898',
        'gray': '#b8b9c1',

        // Dark color pallette
        'd-bg': '#0d1116',
        'd-bg-accent': '#161C23',
        'd-card': '#2d3339',
        'd-body': '#8b8e91',
        'd-accent-body': '#45494f',
        'd-white': '#d1d1d1',
        'd-accent-white': '#989898',
      }
    },
  },
  plugins: [],
}