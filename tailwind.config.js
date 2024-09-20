/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
    },
    fontFamily: {
      inter: ["Inter", "system-ui", "Helvetica", "Arial", "sans-serif"],
      geologica: ["Geologica", "system-ui", "Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};
