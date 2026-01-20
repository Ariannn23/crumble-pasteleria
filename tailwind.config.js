/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        crumble: {
          // Paleta primaria (tonos rojos/borgoña oscuros)
          primary: "#993833", // color1 - rojo borgoña principal
          secondary: "#872a26", // color2 - rojo borgoña medio-oscuro
          dark: "#751c19", // color3 - rojo borgoña oscuro
          darker: "#630e0d", // color4 - rojo muy oscuro
          darkest: "#510000", // color5 - rojo casi negro

          // Paleta secundaria (tonos rosados/crema cálidos)
          accent: "#a42b2a", // color1 - rojo coral
          rose: "#bb5a55", // color2 - rosa coral
          pink: "#d28980", // color3 - rosa suave
          peach: "#e8b9ab", // color4 - durazno
          cream: "#ffe8d6", // color5 - crema cálido

          // Colores adicionales para contraste
          chocolate: "#7C2D12", // mantener para compatibilidad
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
