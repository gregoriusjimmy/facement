/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#dce1f6',
          200: '#b8c3ec',
          300: '#95a5e3',
          400: '#7187d9',
          500: '#4e69d0',
          600: '#3e54a6',
          700: '#2f3f7d',
          800: '#1f2a53',
          900: '#10152a',
        },
        secondary: {
          100: '#fcd5dc',
          200: '#f9abb8',
          300: '#f68295',
          400: '#f35871',
          500: '#f02e4e',
          600: '#c0253e',
          700: '#901c2f',
          800: '#60121f',
          900: '#300910',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
}
