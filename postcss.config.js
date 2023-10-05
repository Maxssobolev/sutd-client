const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    require("postcss-preset-env"),
    tailwindcss('./tailwind.js'),
    require('autoprefixer')
  ],
};
