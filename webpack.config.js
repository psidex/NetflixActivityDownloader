const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'netflixstats.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
