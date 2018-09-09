const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss?$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader',}
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'React Boilerplate'
    }),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    modules: [
      __dirname,
      'node_modules'
    ],
    extensions: ['.js', '.jsx']
  },
  devtool: process.env.NODE_ENV === 'development'
    ? 'cheap-module-eval-source-map'
    : undefined
};
