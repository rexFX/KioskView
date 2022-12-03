/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'limelight': ['Limelight', 'sans-serif'],
        'coda': ['Coda', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
