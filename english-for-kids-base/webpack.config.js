// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const isProduction = process.env.NODE_ENV == 'development';
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext]',
    },
    devServer: {
        open: true,
        host: 'localhost',
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/

        new HtmlWebpackPlugin({
            title: 'async-race',
            template: './src/index.html',
          }),
      
        new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        }),
      
        new CleanWebpackPlugin({
        cleanStaleWebpackAssets: true,
        }),
    
        new ESLintPlugin({
        extensions: ['.js', '.ts'],
        }),
        new CopyPlugin({
        patterns: [
            { context: './src/assets/', from: 'images/**', to: 'assets', noErrorOnMissing: false },
            { context: './src/assets/', from: 'audio/**', to: 'assets', noErrorOnMissing: false },
        ],
        options: {
            concurrency: 100,
        },
        }),
    ],
    module: {
        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/

        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ico|eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
