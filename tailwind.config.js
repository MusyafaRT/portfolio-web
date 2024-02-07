/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        desktop: "960px",
      },
      colors: {
        cyan: "#B6F2F1",
        lightGray: "#DFDDDF",
        darkBlue: "#223741",
        grey: "#4B7078",
        orange: "#F1962E",
      },
    },
  },
  plugins: [],
};
