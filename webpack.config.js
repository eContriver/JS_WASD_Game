const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const webpack = require('webpack');

module.exports = {
  entry: './src/game.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'web',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
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
