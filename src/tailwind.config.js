export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          500: "#6366f1",
          600: "#4f46e5",
        },
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};