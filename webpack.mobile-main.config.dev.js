var path = require('path');
var webpack = require('webpack');
var rootPath = path.join(__dirname, 'resources/assets/mobile-main/js');
module.exports = {
    // context: __dirname + '/resources/assets/mobile-main/js',
    entry: {
        app: ["webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server", path.resolve(rootPath, 'app.js')]
    },
    output: {
        path: path.resolve(__dirname, 'public/assets/mobile-main/js'),
        publicPath: 'http://localhost:3000/assets/mobile-main/js/',
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin(),
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