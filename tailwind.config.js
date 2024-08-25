/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
      primaryColor:"#184E77",
      secondaryColor:"#C7F9CC",
      white:"#f1faee",
      black:"#001219",
      bodyText:"#6c757d",
      },
    },
  },
  plugins: [],
};
