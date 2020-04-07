const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'netflixstats.js',
        path: path.resolve(__dirname, 'dist'),
    },
    // https://webpack.js.org/plugins/define-plugin/
    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pkg.version),
        }),
    ],
    // https://webpack.js.org/loaders/html-loader/
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ],
    },
};
