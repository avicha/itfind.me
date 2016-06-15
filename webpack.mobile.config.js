module.exports = {
    context: __dirname + '/resources/assets/js/mobile',
    entry: {
        index: ['./entries/index.js']
    },
    output: {
        path: './build/assets/js/mobile/entries',
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
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}