/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        guide: "repeat(auto-fit, minmax(400px, 400px))",
        guideMobile: "repeat(auto-fit, minmax(1fr, 400px))",
      },
      maxHeight: {
        128: "32rem",
      },
      maxWidth: {
        300: "75rem",
        400: "87rem",
      },
      spacing: {
        128: "32rem"
      },
      fontFamily: {
        mono: ["FK Grotesk Mono, Inconsolata, monospace"],
        display: [
          "Arthemys Display, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif",
        ],
        title: [
          "Gustavo, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif",
        ],
        body: [
          "FK Grotesk, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif",
        ],
      },
      fontSize: {
        "7.5xl": "5.7rem",
      },
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        "4xl": "80px"
      },
      colors: {
        gray: {
          600: "rgba(115, 115, 126, 1)",
          700: "rgba(73, 73, 80, 1)",
          800: "rgba(23, 23, 23, 1)",
          900: "rgba(15, 16, 20, 1)",
        },
        yellow: {
          500: "#FEFF4D"
        }
      },
    },
  },
  plugins: [],
};
