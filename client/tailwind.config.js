/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./common/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        myscreen: "cal(100vh - 120px)"
      }
    },
  },
  plugins: [],
}