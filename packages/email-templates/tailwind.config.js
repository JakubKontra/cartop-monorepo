/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cartop: {
          orange: '#F23207',
          red: '#C90932',
          gray: {
            light: '#F1F1F1',
            border: '#E5E5E5',
            text: '#6B6B6B',
            footer: '#64697A',
          }
        }
      },
      fontFamily: {
        'verdana': ['Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}