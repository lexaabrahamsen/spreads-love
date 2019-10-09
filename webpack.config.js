const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/index.js',

  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, './client/src')
      ],
      options: {
        presets: ['@babel/preset-react']
        // presets: ['react']
      },
    }],
  },

  devServer: {
    contentBase: path.resolve(__dirname, './client/dist'),
    compress: true,
    port: 8000
  }
};
