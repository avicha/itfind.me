module.exports = {
    context: __dirname + '/resources/assets/js/pc',
    entry: {
        index: ['./entries/index.js']
    },
    output: {
        path: './public/assets/js/pc/entries',
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