// shared config (dev and prod)
const path = require('path');
const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // 别名
    alias: {
      src: path.join(__dirname, '../../src'),
      assets: path.join(__dirname, '../../src/assets'),
      components: path.join(__dirname, '../../src/components'),
      hooks: path.join(__dirname, '../../src/hooks'),
      pages: path.join(__dirname, '../../src/pages'),
      routers: path.join(__dirname, '../../src/routers'),
      stores: path.join(__dirname, '../../src/stores'),
      styles: path.join(__dirname, '../../src/styles'),
      utils: path.join(__dirname, '../../src/utils')
    }
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }]]
            }
          },
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.less$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: {
                // 'primary-color': '#0fb6d3',
                // 'link-color': '#0fb6d3',
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
      }
    ]
  },
  plugins: [new CheckerPlugin(), new HtmlWebpackPlugin({ template: 'index.html.ejs' })],
  performance: {
    hints: false
  }
};
