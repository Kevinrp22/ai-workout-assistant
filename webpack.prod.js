/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "chunk.[chunkhash].js",
    publicPath: './',
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 900000,
      maxSize: 1200000,
    },
  },
});
