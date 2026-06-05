import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "ui-serif", "serif"]
      },
      colors: {
        cotton: {
          50: "#f6fbfb",
          100: "#e6f3f2",
          200: "#c9e2e0",
          300: "#94c7c3",
          500: "#3d8f8a",
          700: "#17646a",
          900: "#102f3f"
        },
        soil: {
          500: "#b7791f",
          700: "#7a4b12"
        },
        skydata: {
          500: "#5974d9",
          700: "#2f448f"
        }
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 47, 63, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
