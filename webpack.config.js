module.exports = {
    entry: './src/js/app.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'script.min.js'
    },
    watch: false, //mozna pominac
    mode : "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
    }
}