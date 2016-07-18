var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/resources/assets/mobile-main/js',
    entry: {
        app: ['babel-polyfill', './app.js']
    },
    output: {
        path: __dirname + '/public/assets/mobile-main/js',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.DedupePlugin(),
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'redux': 'Redux'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('node_modules'), path.resolve('resources/assets/services')]
    }
}