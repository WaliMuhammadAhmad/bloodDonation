/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#151515",
        primary: "#A91D3A",
        secondary: "#C73659",
        text: "#EEEEEE",
      },
    },
  },
  plugins: [daisyui],
};
