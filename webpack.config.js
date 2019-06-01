const path = require('path');

module.exports = {
    entry: './js/bundle/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js/bundle')
    }
}