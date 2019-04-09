const path = require('path');
const cwd = process.cwd();

module.exports = require("quip-apps-webpack-config");

module.exports.entry[2] = path.resolve(cwd, "./src/root.js");

module.exports.node = {
  global: false,
}

module.exports.module.loaders.forEach((loader) => {
  if (loader.test.toString() == '/\.less$/') {
    loader.use.unshift('vue-style-loader');
  }
});

module.exports.module.loaders.push({
  test: /\.vue$/,
  loader: 'vue-loader',
});
