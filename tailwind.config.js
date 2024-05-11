/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#25704B',
        error: '#FA525C',
        success: '#52FA7C',
        dark: '#3A3A3A',
        accent: '#0F8B5C',
      },
    },
  },
  plugins: [],
}
