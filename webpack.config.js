module.exports = {
    entry: './src/js/app.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'script.min.js'
    },
    watch: true,
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["env", {
                            targets: {
                                browsers: ['> 1%']
                            }
                        }]]
                    }
                }
            }
        ]
    }
}