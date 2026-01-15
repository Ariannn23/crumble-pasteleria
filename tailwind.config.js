/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        crumble: {
          cream: "#FFF7ED",
          chocolate: "#7C2D12",
          caramel: "#D97706",
          dark: "#3F2A1D",
          mint: "#AFD4C8",
          sky: "#BFD1D2",
          rose: "#FED0C9",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
