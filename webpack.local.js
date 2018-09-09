const path = require("path");
const webpack = require('webpack');
const config = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

config.mode = 'development';
config.devtool = 'cheap-eval-source-map ';

module.exports = config;