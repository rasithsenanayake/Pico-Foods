export default {content: [
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#013F14',
          dark: '#002D0D',
          light: '#D6E8D9',
          soft: '#EEF5EC',
        },
        sun: {
          DEFAULT: '#DB9F00',
          soft: '#FBF3D8',
        },
        cream: '#FAFBF5',
        ink: {
          DEFAULT: '#17241B',
          muted: '#5A6A5E',
        },
        line: '#E2E9DC',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
};
