const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const config = require('./webpack.base.js');


config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'BABEL_ENV': 'production'
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  // new BundleAnalyzerPlugin()
]);
config.stats = {
  all: false,
  errors: true,
  errorDetails: true,
  assets: true,
  builtAt: true,
  chunkModules: true
};
config.optimization = {
  minimizer: [
    new UglifyJsPlugin()
  ]
};


module.exports = config;