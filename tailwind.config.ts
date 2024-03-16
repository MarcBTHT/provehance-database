import type { Config } from "tailwindcss";

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: { 
        'tiffany_blue': { DEFAULT: '#87CBD0', 100: '#132f31', 200: '#265e62', 300: '#398e94', 400: '#55b6bd', 500: '#87cbd0', 600: '#9ed5d9', 700: '#b6e0e3', 800: '#cfeaec', 900: '#e7f5f6' }, 
        'persian_blue': { DEFAULT: '#4938A3', 100: '#0f0b21', 200: '#1e1641', 300: '#2c2262', 400: '#3b2d83', 500: '#4938a3', 600: '#6552c4', 700: '#8b7dd3', 800: '#b2a8e1', 900: '#d8d4f0' }, 
        'violet_(jtc)': { DEFAULT: '#532049', 100: '#11070f', 200: '#220d1e', 300: '#33142c', 400: '#441a3b', 500: '#532049', 600: '#8d377c', 700: '#bd55a8', 800: '#d38ec5', 900: '#e9c6e2' }, 
        'glaucous': { DEFAULT: '#5E76AD', 100: '#121723', 200: '#242e47', 300: '#35456a', 400: '#475c8d', 500: '#5e76ad', 600: '#7d90bd', 700: '#9dacce', 800: '#bec8de', 900: '#dee3ef' },

        'rebecca_purple': { DEFAULT: '#523795', 100: '#100b1e', 200: '#21163c', 300: '#312159', 400: '#412c77', 500: '#523795', 600: '#6c4cbd', 700: '#9179cd', 800: '#b6a6de', 900: '#dad2ee' }, 
        'grape': { DEFAULT: '#7923AB', 100: '#180722', 200: '#300e44', 300: '#481566', 400: '#601c87', 500: '#7923ab', 600: '#9a34d5', 700: '#b367e0', 800: '#cd99ea', 900: '#e6ccf5' }, 
        'lavender': { DEFAULT: '#E6EBFF', 100: '#001361', 200: '#0027c2', 300: '#2450ff', 400: '#859dff', 500: '#e6ebff', 600: '#ebefff', 700: '#f0f3ff', 800: '#f5f7ff', 900: '#fafbff' }, 
        'dark_purple': { DEFAULT: '#422036', 100: '#0d060b', 200: '#1a0d15', 300: '#271320', 400: '#34192b', 500: '#422036', 600: '#793a63', 700: '#ae5890', 800: '#c98fb5', 900: '#e4c7da' },
        
        'old_rose': { DEFAULT: '#d4897f', 100: '#321511', 200: '#652a22', 300: '#973e32', 400: '#c3594a', 500: '#d4897f', 600: '#dc9f97', 700: '#e5b7b1', 800: '#eecfcb', 900: '#f6e7e5' }, 
        'thulian_pink': { DEFAULT: '#c9759c', 100: '#2e121f', 200: '#5b233d', 300: '#89355c', 400: '#b6477b', 500: '#c9759c', 600: '#d48faf', 700: '#deabc3', 800: '#e9c7d7', 900: '#f4e3eb' }
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
