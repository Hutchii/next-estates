/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      purple: "#4f40da",
      "purple-dark": "#1c1840",
      "purple-light": "#e7e6f2",
      grey: "#8c95a8",
      bg: "#f2f2f7",
      white: "#ffffff",
      red: "#eb4b5f",
      yellow: "#fec861",
    },
    fontFamily: {
      sans: ["Roboto"],
    },
    fontSize: {
      xs: "1rem",
      sm: "1.125rem",
      md: "1.375rem",
      lg: "1.75rem",
      xl: "4.25rem",
      // xl: "2.25rem",
      // "2xl": "2.75rem",
      // "3xl": "3.375rem",
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
      "4xl": "1920px",
      "5xl": "2048px",
    },
  },
  plugins: [],
};
