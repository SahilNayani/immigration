/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        xl: '4rem',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      primary: ['Lato', 'sans-serif']
    },
    extend: {
      fontSize: {
        '10': ['0.625rem', '0.75rem'],
        '13': ['0.813rem', '1rem'],
        '26': ['1.625rem', '2rem'],
        '40': ['2.5rem', '2.5rem'],
      },
      colors: {
        primary: {
          DEFAULT: '#447e74',
          hover: '#525252',
        },
        secondary: {
          DEFAULT: '#525252',
          hover: '#447e74',
        },
      },
    },
  },
  plugins: [],
}