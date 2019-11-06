// production config
const merge = require('webpack-merge');
const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');
const { resolve } = require('path');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  stats: 'minimal',
  entry: './index.tsx',
  output: {
    filename: 'js/bundle.[hash:8].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/'
  },
  // devtool: 'source-map',
  optimization: {
    namedModules: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: 'manifest'
    },
    noEmitOnErrors: true
  },
  plugins: [new Uglify()]
});
