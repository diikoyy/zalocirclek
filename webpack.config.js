const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server4.js',
  output: {
    filename: 'server_zalo.js',
    path: path.resolve(__dirname, 'server_zalo'),
  },
  target: 'node',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};