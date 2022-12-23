const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require('webpack');

console.log(`webpack version : ${webpack.version}`)

module.exports = {
    webpack: function (config, env) {
        // ...add your webpack config
        if (env !== 'development') {
            // ignore moment locale module
            config.plugins.push(new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }))
            // minimizer
            config.plugins.push(
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        sourceMap: false,
                        compress: {
                            drop_console: true,
                        },
                    }
                })
            )
            // css minimizer
            // eslint-disable-next-line no-unused-expressions
            config.optimization.minimizer.push(new CssMinimizerPlugin(
                {
                    parallel: true,
                    test: /\.foo\.css$/i,
                }
            ))
            config.plugins.push(new MiniCssExtractPlugin())

            //config splitChunks
            console.log(config.optimization);
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        filename: 'vendors.[contenthash].js',
                        chunks: 'all'
                    },
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)/,
                        name: 'reactVendor',
                        chunks: 'all',
                        priority: 10,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                }

            }
        }
        return config;
    }
    ,
}
