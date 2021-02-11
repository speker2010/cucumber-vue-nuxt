module.exports = {
  presets: ['@babel/preset-env'],
  "plugins": [
    ["babel-plugin-webpack-alias-7", {config: './test/webpack.config.test.js'}]
  ]
}
