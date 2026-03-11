/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          green: '#22c55e',
          dark: '#050505',
        }
      }
    },
  },
  plugins: [],
}


