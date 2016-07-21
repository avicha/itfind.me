var path = require('path');
var webpack = require('webpack');

var sourceDir = path.join(__dirname, 'resources/assets');
var buildDir = path.join(__dirname, 'public/assets');
var relativeDir = 'pc-main/js';
var devServerConf = {
    hot: true,
    host: 'localhost',
    port: 3002,
    proxy: {
        '*': {
            target: 'http://itfind.me',
            secure: false,
            changeOrigin: true,
        }
    }
};
module.exports = {
    entry: {

    },
    output: {
        path: path.join(buildDir, relativeDir),
        publicPath: '/assets/pc-main/js/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: devServerConf,
    externals: {
        'jquery': 'jQuery',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('node_modules'), path.resolve('resources/assets/services')]
    }
}