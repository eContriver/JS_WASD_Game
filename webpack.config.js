const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const webpack = require('webpack');

const glob = require("glob");

let entry = __dirname + "/src/main.ts";
let outputPath = __dirname + "/dist/";
let devtool = null

if (process.env.TESTBUILD) {
  entry = glob.sync(__dirname + "/test/*.test.ts");
  outputPath = __dirname + "/test-dist/";
  devtool = "source-map";
}

module.exports = {
  entry: entry, //'./src/game.ts',
  devtool: devtool, //'inline-source-map',
  mode: 'development',
  target: 'web',
  output: {
    // filename: 'main.js',
    path: outputPath //path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  // optimization: {
  //   minimize: false
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ]
  },
};
