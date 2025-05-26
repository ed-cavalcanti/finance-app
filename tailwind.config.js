/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-thin": ["Geist_100Thin"],
        "geist-extralight": ["Geist_200ExtraLight"],
        "geist-light": ["Geist_300Light"],
        "geist": ["Geist_400Regular"],
        "geist-medium": ["Geist_500Medium"],
        "geist-semibold": ["Geist_600SemiBold"],
        "geist-bold": ["Geist_700Bold"],
        "geist-extrabold": ["Geist_800ExtraBold"],
        "geist-black": ["Geist_900Black"],
      },
      colors: {
        "dark-gray": "#202020",
        "primary": "#202020",
        "secondary": "#8C8D98",
        "base-white": "#FEFEFE",
        "light-gray": "#F1F2EB",
        "cyber-green": {
          300: "#E4FE68",
          500: "#B5C46C"
        },
        "success": "#2C932C",
        "warning": "#C83040"
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};