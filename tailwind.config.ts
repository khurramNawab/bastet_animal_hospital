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
          50: '#F0F7F7',
          100: '#D9ECEE',
          200: '#B5DCDE',
          300: '#86C5C9',
          400: '#4DA7AC',
          500: '#2A868B',
          600: '#1C696E',
          700: '#145155',
          800: '#0B3C3F', // Brand primary
          900: '#062527',
          dark: '#051E20',
          light: '#135559',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E2C87D',
          dark: '#9E7B2F',
          50: '#FDFBF4',
          100: '#F9F4E3',
          200: '#F2E6C2',
          300: '#E8D497',
          400: '#DCBF6F',
          500: '#C9A24B', // Brand gold
          600: '#AD8435',
          700: '#896428',
          800: '#6C4D22',
          900: '#553C1D',
        },
        cream: {
          DEFAULT: '#FAF5E9',
          light: '#FFFFFF',
          dark: '#F0E7D1',
          50: '#FDFAF4',
          100: '#FAF5E9',
          200: '#F3E9CD',
          300: '#EBDCB0',
        },
        ink: {
          DEFAULT: '#0A1A1C',
          light: '#1A2C2E',
          dark: '#040B0C',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        serif: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 162, 75, 0.25)',
        'gold-glow-lg': '0 0 45px rgba(201, 162, 75, 0.4)',
        'teal-glow': '0 0 30px rgba(11, 60, 63, 0.35)',
        glass: '0 8px 32px 0 rgba(10, 26, 28, 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
