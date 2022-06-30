/** @type {import('tailwindcss').Config} */
const { join } = require("path");

module.exports = {
  content: [join(__dirname, "src/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {
      colors: {
        yellow: "#ffd300",
        tangerine: "#ff9200",
        cloudyBlue: "#cad7dd",
        blueGreen: "#49c8a8",
        paleGrey: "#f5f8f9",
        charcoalGrey: "#373d40",
      },
    },
  },
  plugins: [],
};
