/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        panel: "#1c1c1c",
        panel2: "#242424",
        line: "#2e2e2e",
        mint: "#7dff9a",
        mint2: "#5ae37a",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Oswald", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(125,255,154,0.25)",
      },
    },
  },
  plugins: [],
};
