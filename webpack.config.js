var WebPack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    path:              __dirname,
    filename:          "[name].js",
    sourceMapFilename: "[name].map"
  },
  module: {
    loaders: [
      {
        test:   /\.css$/,
        loader: 'style!css'
      },
      {
        test:    /\.es6$/,
        exclude: /node_modules/,
        loader:  'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new WebPack.optimize.UglifyJsPlugin()
  ]
};
