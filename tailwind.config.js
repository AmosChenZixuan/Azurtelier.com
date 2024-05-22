// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const fonts = ['var(--font-pangolin)', 'var(--font-zcool-kuaile)', ...fontFamily.sans]
/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: fonts,
        orbitron: ['var(--font-orbitron)', ...fontFamily.sans],
        zzz: ['zzz-a', ...fonts],
        zzz2: ['zzz-b', ...fonts],
        teyvat: ['teyvat', ...fonts],
        starrail: ['hsr', ...fonts],
        fontaine: ['fontaine', ...fonts],
      },
      colors: {
        primary: colors.violet,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.gray.800'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
              font: fonts,
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            s: {
              textDecoration: 'none', // remove strikethrough
              color: 'transparent',
              backgroundColor: theme('colors.gray.800'),
              borderRadius: '0.25rem',
              transition: 'all 0.5s ease',
              '&:hover': {
                color: theme('colors.gray.400'),
                backgroundColor: 'transparent',
              },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },
      }),
      boxShadow: {
        azure: '0 0 2px 2px rgba(240, 255, 255, 0.7)',
        purple: '0 0 2px 1px rgba(140, 140, 230,0.7)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
