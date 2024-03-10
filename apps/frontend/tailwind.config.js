const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{ts,tsx,js,jsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        s: '16px',
        m: '24px',
        l: '36px',
      },
      fontSize: {
        xs: '0.75rem',
        s: '0.875rem',
        m: '1rem',
        l: '1.125rem',
        xl: '1.25rem',
        xxl: '1.625rem',
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      colors: {
        accent: {
          100: '#bea6ff',
          300: '#a280ff',
          500: '#8c61ff',
          700: '#704ecc',
          900: '#382766',
        },
        success: {
          100: '#80ffbf',
          300: '#22e584',
          500: '#14cc70',
          700: '#0f9954',
          900: '#0a6638',
        },
        danger: {
          100: '#ff8099',
          300: '#f23d61',
          500: '#cc1439',
          700: '#990f2b',
          900: '#660a1d',
        },
        warning: {
          100: '#ffd073',
          300: '#e5ac39',
          500: '#d99000',
          700: '#960',
          900: '#640',
        },
        info: {
          100: '#73a5ff',
          300: '#4c8dff',
          500: '#397df6',
          700: '#2f68cc',
          900: '#234e99',
        },
        light: {
          100: '#fff',
          300: '#f9f7ff',
          500: '#f4f2fa',
          700: '#dcdae0',
          900: '#c3c1c7',
        },
        dark: {
          100: '#808080',
          300: '#4c4c4c',
          400: '#313131',
          500: '#333',
          700: '#171717',
          900: '#000',
        },
      },
    },
  },
  plugins: [],
};
