const path = require('path');

module.exports = {
  entry: "./client/src/index.js",

  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      include: [
        path.resolve(__dirname, './client/dist')
      ],
      options: {
        presets: ['react']
      },
    }]

  }
};
