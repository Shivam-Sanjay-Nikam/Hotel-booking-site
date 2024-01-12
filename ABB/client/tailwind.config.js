/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '160': '160px',
      },
      height: {
        '160': '160px',
      },
    },
  },
  plugins: [],
}

