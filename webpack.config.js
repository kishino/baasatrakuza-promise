var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'baasatrakuza-promise.js',
    library: 'RKZClientPromise',
    libraryTarget: 'umd'
  }
};