const path = require("path");
const webpack = require("webpack");


module.exports = {
  entry: "./src/index.js",
  output: {
      path: path.resolve(__dirname, "./static/frontend"),
      filename: "[name].js",
      sourceMapFilename: "[name].js.map"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
      }
    ]
  },
  optimization: {
    minimize: true,

  },
  devtool: "eval-cheap-source-map"
}
