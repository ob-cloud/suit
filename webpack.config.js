var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
      'hardware-suit': './build/main/index.js',
      'hardware-suit.min': './build/main/index.js'
  },
  output: {
      libraryTarget: 'umd',
      path: path.resolve('dist')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: false
        }
      })
    ]
  },
  performance: {
    hints: false
  }
}];
