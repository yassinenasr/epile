/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6d4c7d", // The signature purple from the screenshots
        "primary-light": "#8B6F9E",
        "background-light": "#f8f9fa",
        "background-dark": "#0f172a",
      },
      fontFamily: {
        display: ["Montserrat", "Outfit", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        "xl": "2rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
