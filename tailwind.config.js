/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
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
      }
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
};