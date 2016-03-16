var webpack = require('webpack')

module.exports = {

  entry: {
    merge: './webpack/merge.js',
    reducers: './webpack/reducers.js'
  },

  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    libraryTarget: 'var',
    library: '[name]'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ]

}