const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        slipmat: {
          100: '#FCE6E6',
          200: '#F7BFBF',
          300: '#F29999',
          400: '#E94D4D',
          500: '#DF0000',
          600: '#C90000',
          700: '#860000',
          800: '#640000',
          900: '#430000',
        },
      },
      fontFamily: {
        sans: ['Play', ...defaultTheme.fontFamily.sans],
        source: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    }),
    require('@tailwindcss/typography'),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
