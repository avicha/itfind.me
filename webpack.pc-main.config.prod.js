var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/resources/assets/pc-main/js',
    entry: {

    },
    output: {
        path: __dirname + '/public/assets/pc-main/js',
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
        root: [path.resolve('node_modules'), path.resolve('resources/assets/services')]
    }
}