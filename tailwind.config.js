/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": '#FFFFFF',
        "black": '#000000',
        "gray": '#383838',
        "green": "#09261D",
        "dark-text": "#222222",
        "light-gray": "#959595",
        "card-bg": "#F8F8F8",
        "cta-color": "#EE770F",
        "brand-color": "#0A3264",
        "bg": "#FFFFFF"
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4'
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#E9E9E9'
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
