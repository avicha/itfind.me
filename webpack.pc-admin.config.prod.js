var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/resources/assets/pc-admin/js',
    entry: {
        'home': ['babel-polyfill', './entries/home.js'],
        'blog/edit': ['babel-polyfill', './entries/blog/edit.js'],
        'article_category/list': ['babel-polyfill', './entries/article_category/list.js'],
        'article/list': ['babel-polyfill', './entries/article/list.js'],
        'article/edit': ['babel-polyfill', './entries/article/edit.js'],
        'article/detail': ['babel-polyfill', './entries/article/detail.js'],
    },
    output: {
        path: __dirname + '/public/assets/pc-admin/js',
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
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'jQuery',
        'react-redux': 'ReactRedux',
        'redux': 'Redux'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('node_modules'), path.resolve('resources/assets/services')]
    }
}