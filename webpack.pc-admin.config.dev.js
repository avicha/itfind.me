var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname + '/resources/assets/js/pc/admin',
    entry: {
        'article_category/list': ['./entries/article_category/list.js']
    },
    output: {
        path: './public/assets/js/pc/admin/entries',
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
            'process.env.NODE_ENV': JSON.stringify('develop')
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
        root: [path.resolve('node_modules'), path.resolve('resources/assets/js')]
    }
}