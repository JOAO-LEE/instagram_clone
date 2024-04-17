import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'spin-once': {
          '0%': { transform: 'rotate(0deg) scale(0.5)', opacity: '0.5' },
          '100%': { transform: 'rotate(180deg) scale(1)', opacity: '1' },
        },
        'spin-once-no-fade': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)'},
        },
      },
      animation: {
        'spin-once': 'spin-once 1s ease-in-out',
        'spin-once-no-fade': 'spin-once-no-fade 2s ease-in-out'
      }
    },
  },

  plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
export default config;
