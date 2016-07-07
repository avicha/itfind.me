var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/resources/assets/js/pc/main',
    entry: {

    },
    output: {
        path: './public/assets/js/pc/main/entries',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    externals: {
        'jquery': 'jQuery',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('node_modules'), path.resolve('resources/assets/js')]
    }
}