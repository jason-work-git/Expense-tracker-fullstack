/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    { pattern: /row-start-\[\d+\]/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};