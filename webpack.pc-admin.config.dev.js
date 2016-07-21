var path = require('path');
var webpack = require('webpack');

var sourceDir = path.join(__dirname, 'resources/assets');
var buildDir = path.join(__dirname, 'public/assets');
var relativeDir = 'pc-admin/js';
var devServerConf = {
    hot: true,
    host: 'localhost',
    port: 3001,
    proxy: {
        '*': {
            target: 'http://admin.itfind.me',
            secure: false,
            changeOrigin: true,
        }
    }
};
module.exports = {
    entry: {
        'home': [path.resolve(sourceDir, relativeDir, './entries/home.js')],
        'blog/edit': [path.resolve(sourceDir, relativeDir, './entries/blog/edit.js')],
        'article_category/list': [path.resolve(sourceDir, relativeDir, './entries/article_category/list.js')],
        'article/list': [path.resolve(sourceDir, relativeDir, './entries/article/list.js')],
        'article/edit': [path.resolve(sourceDir, relativeDir, './entries/article/edit.js')],
        'article/detail': [path.resolve(sourceDir, relativeDir, './entries/article/detail.js')],
    },
    output: {
        path: path.join(buildDir, relativeDir),
        publicPath: 'http://' + devServerConf.host + ':' + devServerConf.port + '/assets/mobile-main/js/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel-loader'],
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