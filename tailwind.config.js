/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kraft: {
          50: '#fbf9f5',
          100: '#f6f2ea',
          200: '#ede3d3',
          300: '#dfcdb4',
          400: '#ccb08f',
          500: '#ba9570',
          600: '#ab8160',
          700: '#8e684e',
          800: '#735542',
          900: '#5e4637',
        },
        terracotta: {
          50: '#fdf5f3',
          100: '#fbe8e4',
          200: '#f7d5cc',
          300: '#f0b7a8',
          400: '#e58e76',
          500: '#d96b4f',
          600: '#c55135',
          700: '#a54029',
          800: '#883725',
          900: '#713224',
        },
        paper: {
          cream: '#FAF7F2',
          card: '#FFFFFF',
          border: '#E8E1D5',
          dark: '#2A2421',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(94, 70, 55, 0.08), 0 2px 6px -1px rgba(94, 70, 55, 0.04)',
        'paper-lg': '0 12px 32px -4px rgba(94, 70, 55, 0.12), 0 4px 12px -2px rgba(94, 70, 55, 0.06)',
        '3d-card': '0 25px 50px -12px rgba(94, 70, 55, 0.25)',
      }
    },
  },
  plugins: [],
}
