const webpack = require('webpack');
const path = require('path');
const cwd = process.cwd();

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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

if (process.env.NODE_ENV != 'development') {
  // Replace the Webpack version of Uglify with the latest Webpack3 plugin in order to fix
  // some syntax handling errors.
  for (let i = 0; i < module.exports.plugins.length; ++i) {
    const plugin = module.exports.plugins[i];
    if (plugin === webpack.optimize.UglifyJsPlugin) {
      module.exports.plugins[i] = new UglifyJsPlugin({
        uglifyOptions: {
          mangle: { reserved: ["quiptext"] }
        }
      });
      break;
    }
  }

  // Tell Vue to be a production version
  module.exports.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }));
}