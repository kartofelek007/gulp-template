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
                test: /\.js$/,  
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: { 
                        presets: ['es2015'] 
                    }
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