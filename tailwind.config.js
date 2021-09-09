module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "90vh": "90vh",
        "85vh": "85vh",
        "600px": "600px",
        "92vh": "92vh",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
