// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgray: '#1f1f1f', // Define your custom dark gray color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
