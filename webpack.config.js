const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: "./src/js/app.js",
    output: { filename: "./dist/js/script.min.js" },
    watch: false, //mozna pominac
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            }
        ],        
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
}