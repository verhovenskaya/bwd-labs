const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 




module.exports = {
    entry: './src/index.js', 


    output: {
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), 
    },


    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader'], 
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',

                        },
                    },
                ],
            }
        ],
    },



    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/img/logo.png', to: 'dist' }, 
            ],
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),

        new HtmlWebpackPlugin({
            template: './src/projects.html',
            inject: true,
            chunks: ['index'],
            filename: 'projects.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ['index'],
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/list.html',
            inject: true,
            chunks: ['index'],
            filename: 'list.html'
        }),
    ],


    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), 
        },
        open: true, 
    },


    mode: 'development', 
};