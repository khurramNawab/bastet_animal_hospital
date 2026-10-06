import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0B3C3F',
          dark: '#07282A',
          light: '#135559',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#DFBD6D',
          dark: '#9F7D30',
        },
        cream: {
          DEFAULT: '#FAF5E9',
          light: '#FFFFFF',
          dark: '#EFE7D3',
        },
        ink: {
          DEFAULT: '#0A1A1C',
          light: '#1B2C2E',
          dark: '#040A0B',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
