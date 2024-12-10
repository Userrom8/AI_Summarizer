/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "slide-in-from-bottom": {
          from: {
            transform: "translateY(0)",
            opacity: "0",
          },
          to: {
            transform: "translateY(-3rem)",
            opacity: "1",
          },
        },
      },
      animation: {
        "slide-in-from-bottom": "slide-in-from-bottom .1s linear forwards",
      },
    },
  },
  plugins: [],
};