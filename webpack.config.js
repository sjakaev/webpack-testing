const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TersrerWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TersrerWebpackPlugin(),
        ]
    }

    return config;
};

const filename = ext => isDev ?  `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main : './index.js',
        analytics : './analytics.js',
    },
    output : {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve : {
        extensions: ['.js','.json','.png'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    }
}
