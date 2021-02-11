var path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.join(__dirname, '../'),
      '~': path.join(__dirname, '../')
    }
  }
}
