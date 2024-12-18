/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      nero: "#221F20",
      bianco: "#FFFFFF",
      magenta: "#E70E74",
      rosso: "#EC3458",
      arancio: "#EF5740",
      mandarino: "#F37828",
      giallo: "#F7A008",
      grigio: "#F9F7F8"
    },
    boxShadow: {
      "linea-magenta": "inset 0 0 0 1px #E70E74",
      "linea-giallo": "inset 0 0 0 1px #F7A008",
      "linea-arancio": "inset 0 0 0 1px #EF5740",
      ledoff: "inset 0px 0px 21px #fff",
      ledon: "0px 0px 20px #fb72bd"
    },
    backgroundImage: {
      sfumatura: "linear-gradient(90deg, #E6007E 0%, #F9B000 100%)"
    }
  },
  plugins: []
};
