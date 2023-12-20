/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        oxford_blue: {
          DEFAULT: "#102542",
          100: "#bad0ee", // lightest
          200: "#75a1de",
          300: "#3172cc",
          400: "#214b87",
          500: "#102542",
          600: "#0d1d35",
          700: "#0a1627",
          800: "#060f1a",
          900: "#03070d", // darkest
        },

        bittersweet: {
          DEFAULT: "#f87060",
          100: "#fee2df", // lightest
          200: "#fcc5be",
          300: "#fba79e",
          400: "#fa8a7e",
          500: "#f87060",
          600: "#f6321c",
          700: "#c51b08",
          800: "#831205",
          900: "#420903", // darkest
        },

        platinum: {
          DEFAULT: "#cdd7d6",
          100: "#f5f7f7", // lightest
          200: "#ebefee",
          300: "#e0e6e6",
          400: "#d6dede",
          500: "#cdd7d6",
          600: "#9eb1af",
          700: "#708b89",
          800: "#4a5d5b",
          900: "#252e2e", // darkest
        },

        khaki: {
          DEFAULT: "#b3a394",
          100: "#f0edea", // lightest
          200: "#e1dad4",
          300: "#d1c8bf",
          400: "#c2b5a9",
          500: "#b3a394",
          600: "#98826d",
          700: "#736151",
          800: "#4c4136",
          900: "#26201b", // darkest
        },
        white: {
          DEFAULT: "#ffffff",
          100: "#333333",
          200: "#666666",
          300: "#999999",
          400: "#cccccc",
          500: "#ffffff",
          600: "#ffffff",
          700: "#ffffff",
          800: "#ffffff",
          900: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
