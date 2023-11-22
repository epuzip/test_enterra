const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('assets', '[name][ext]'),
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(scss|css)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {           
            test: /\.png$/,
            type: 'asset/resource',
        },
        {
            test: /\.(jpg|jpeg|gif)$/i,
            use: ['url-loader', 'file-loader'],
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: ['url-loader', 'file-loader'],
            generator: {
                filename: path.join('[name][ext]'),
            },
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'template.html'),
        filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
};