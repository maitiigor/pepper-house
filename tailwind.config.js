module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screen: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '500px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      height: {
        '150': '100rem'
      }
    },
  },
  variants: {
    width: ['hover','focus','responsive'],
    extend: {
      backgroundColor: ['even','odd'],
    },
  },
  plugins: [],
}
