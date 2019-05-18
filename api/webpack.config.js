const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );

const file = process.env.FILE || 'api';

module.exports = {
  entry: `./src/${file}.ts`,
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  externals: [nodeExternals()],
  stats: 'errors-only',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ]
}