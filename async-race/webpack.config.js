// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
  
    entry: {
      app: './src/index.ts',
    },
  
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext]',
    },
  
    module: {
      rules: [
        {
          test: /\.[tj]s$/i,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(?:ico|png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
  
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
  
    resolve: {
      extensions: ['.js', '.ts', '.css', '.scss'],
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'async-race',
      }),
  
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
  
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
  
      new ESLintPlugin({
        extensions: ['.js', '.ts'],
      }),
      new CopyPlugin({
        patterns: [
          { context: './src/assets/', from: 'images/*', to: 'assets', noErrorOnMissing: true },
          { context: './src/assets/', from: 'icons/*', to: 'assets', noErrorOnMissing: true },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
  };
