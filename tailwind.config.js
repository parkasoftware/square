module.exports = {
  content: ["./assets/js/main.js", "./**/*.{html,hbs}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      body: ["Manrope", "sans-serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "3rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "1rem",
      },
      screens: {
        "2xl": "1350px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
