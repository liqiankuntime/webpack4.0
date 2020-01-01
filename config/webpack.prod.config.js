
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",//运行模式 development | production
    devtool: "cheap-module-source-map", //使编译的内容和源码对应起来，更加方便调试，速度更快
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({})//把分割打包的css文件压缩合并
        ]
    },
    /**
     * webpack的四大核心：入口，出口，加载器(loader)，插件(plugins)
     * */
    module: {
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                impportLoaders: 2
                            }
                        },
                        'less-loader',
                        'postcss-loader'//这个是为了给样式属性加兼容的厂商属性
                    ]
                },
                {
                    test: /\.css/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'//这个是为了给样式属性加兼容的厂商属性
                    ]
                }
            ]
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}
module.exports = merge(commonConfig, prodConfig);