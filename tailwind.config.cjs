/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        guide: "repeat(auto-fit, minmax(400px, 400px))",
        guideMobile: "repeat(auto-fit, minmax(1fr, 400px))",
      },
      zIndex: {
        "negative": -1,
      },
      height: {
        120: "30rem",
        128: "32rem",
      },
      maxHeight: {
        120: "30rem",
        128: "32rem",
      },
      maxWidth: {
        200: "32rem",
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
          "Neue Haas Grotesk Display Pro, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif",
        ],
        body: [
          "TT Interfaces, Helvetica Neue, Helvetica, Segoe UI, Arial, sans-serif",
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
      lineHeight: {
        "title": "50px"
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
