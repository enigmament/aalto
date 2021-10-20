const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');


let cfg = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: './'
    },
    babel: {
        presets: [
            [
                '@babel/preset-env',
                { modules: false }
            ],
            '@babel/preset-react'
        ]
    },
    inlineImageLimit: 10485760,
};

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        hot: true,
        liveReload: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { modules: false }
                            ],
                            '@babel/preset-react'
                        ]
                    }
                }
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            hot: true
        })
    ],
};