var path = require('path');
var webpack = require('webpack');

var sourceDir = path.join(__dirname, 'resources/assets');
var buildDir = path.join(__dirname, 'public/assets');
var relativeDir = 'mobile-main/js';
var devServerConf = {
    hot: true,
    host: 'localhost',
    port: 3000,
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
        app: [path.resolve(sourceDir, relativeDir, 'app.js')]
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
        'react-redux': 'ReactRedux',
        'redux': 'Redux'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [path.resolve('node_modules'), path.resolve('resources/assets/services')]
    }
}