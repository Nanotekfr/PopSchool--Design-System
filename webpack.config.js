/**
 * Webpack config for the bundles
 *
 * @author lo.pennequin@gmail.com (Daria)
 */


const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = env => {
    const isProd = env.NODE_ENV === 'production';
    return {
        mode: env.NODE_ENV,

        target: 'web',

        devtool: 'inline-source-maps',

        entry: {
            app: path.resolve(__dirname, 'src/js/index.js')
        },

        output: {
            path: path.resolve(__dirname, 'dist/assets'),
            //chunkFilename: '[name].js'
        },

        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            hot: true
        },

        module: {
            rules: [

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                        }
                    }
                },

                {
                    test: /\.sass$/,
                    use: [
                        !isProd && 'css-hot-loader',
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ].filter(loader => loader !== false)
                },

                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },

                {
                    test: /\.html$/,
                    use: [
                        'html-loader'
                    ]
                }
            ]
        },
        plugins: [

            new CleanWebpackPlugin(['dist/assets/*']),
            new WriteFilePlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
        optimization: {
            minimizer: [
                isProd && new UglifyWebpackPlugin({ sourceMap: true }),
                isProd && new OptimizeCssAssetsPlugin({ cssProcessorOptions: { map: { inline: true } } })
            ]
            .filter(plugin => plugin !== false)
        }
    };
};
