import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        peach: '#ffd8bf',
        'soft-yellow': '#fff2cc',
        cream: '#fff9f4',
        'light-brown': '#8B5E3C',
      },
      fontFamily: {
        pacifico: ['Pacifico', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        },
      },
    },
  },
  plugins: [],
}