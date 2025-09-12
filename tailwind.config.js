/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        surface: '#1e293b',
        text: '#f1f5f9',
      },
    },
  },
  plugins: [],
}