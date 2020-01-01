/**
 Created By liqiankun on 2019/12/3
 */

const path = require('path');
// 会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
//当打包前，先删除dist目录下的东西
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');



const commonConfig = {

    //代码分割配置
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all', //"all"(对同步/异步导入的包进行代码分割) | "async"(对异步引入的包进行代码分割)   | "initial"(对同步引入的包进行代码分割)
            //一下都可以注释掉，因为默认就是走一下配置
            // minSize: 30000,//当引入的包的大小超过是30kb时才进行分割
            // minRemainingSize: 0,
            // maxSize: 0,
            // minChunks: 1,//一个模块最少被引入了1次才进行代码	分割
            // maxAsyncRequests: 6,//同时加载的模块数最多6个
            // maxInitialRequests: 4,//入口文件最多分割4个文件
            // automaticNameDelimiter: '~',
            // automaticNameMaxLength: 30,
            // cacheGroups: {
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,//同步引入包文件分割代码时需要
            //         priority: -10,
            //         filename: 'vendors',//生成的文件就叫 "vendors"
            //     },
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true
            //     }
            // }
        }
    },
    /**
     * webpack的四大核心：入口，出口，加载器(loader)，插件(plugins)
     * */
    entry: './src/index.js',
    output: {
        // publicPath: "www.baidu.com",//html中引用打包的js时，在名字前加上地址
        filename: "main.js",
        path: path.resolve(__dirname, '../bundle')
    },
    //loader(加载器)
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                //option的配置在.babelrc文件里
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            }
        ]
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new CleanWebpackPlugin(['bundle'], {//清除根目录下的bundle包内容，而不是当前文件下的bundle内容
        //     root: path.resolve(__dirname, '../')
        // }),
        new webpack.ProvidePlugin({
            "$": 'jquery'
        })
    ]
}

module.exports = commonConfig