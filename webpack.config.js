const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'script.min.js'
    },
    watch: false, //mozna pominac
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js$/,  exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    "presets": [
                        ["env", {
                          "targets": {
                            "browsers": ["> 1%"]
                          }
                        }]
                      ]
                }
            }
        ],
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
}