const path = require('path')

module.exports = (env) => {
  const plugins = [];

  return {
    entry: {
      validator: './index.js'
    },
    mode: 'production',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'slime-validator.umd.js',
      libraryTarget: 'umd',
      library: 'SlimeValidator'
    },
    target: ['web', 'es5'],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: plugins
  }
}