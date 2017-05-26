var webpack = require('webpack');
var path = require('path');
var inProduction = process.env.NODE_ENV === 'production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: [
            './src/main.js' ,
            // './src/main.styl' // if we don't want to require de styl inside de js (require(file.styl))
             ],

    },
    // entry: './src/main.js', // another way
    output: {
        path: path.resolve(__dirname, './dist'), // webpack wants your output path to be an absolute path
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'stylus-loader'], // From right to left // css-loader lets read .css only. To apply styles we can use style-loader
                    fallback: 'style-loader' // in case extractplugin doesnt work
                })
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'), // [name] reference to entry name

        new webpack.LoaderOptionsPlugin({ // to minimize CSS
            minimize: inProduction
        })
    ]
};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}
