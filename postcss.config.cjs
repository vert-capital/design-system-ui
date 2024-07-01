const config = require('./tailwind.config.cjs');

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config },
    autoprefixer: {},
  },
};
