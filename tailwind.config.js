export default {
  content: ["src/**/*"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["cmyk", "business"],
    logs: false,
  },
};
