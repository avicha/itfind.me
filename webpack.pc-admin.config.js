module.exports = {
    context: __dirname + '/resources/assets/js/pc/admin',
    entry: {
        'index': ['./entries/index.js'],
        'article/edit': ['./entries/article/edit.js'],
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
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'qs': 'qs',
        'jquery': 'jQuery',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            jQuery: 'jquery' // 强制转换包名
        }
    }
}