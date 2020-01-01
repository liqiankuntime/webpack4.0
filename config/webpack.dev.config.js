
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: "development",//运行模式 development | production
    devtool: "cheap-module-eval-source-map", //使编译的内容和源码对应起来，更加方便调试，速度更快

    //在开发环境中需要启动一个前端服务器，线上代码是不需要的
    devServer: {
        contentBase: './bundle',
        open: true, //启动时自动打开浏览器
        port: 8080, //启动的端口
        hot: true, //开启HMR功能，并配合new webpack.HotReplacementPlugin()
        hotOnly: true, //把这个去掉后，修改完内容后浏览器自动刷新
        proxy: {
            "/react/api": {
                target: 'http://www.dell-lee.com', //当请求当地址是以【/react/api】开头当，那么就代理到这里
                pathRewrite: {
                    //header.json是正式环境接口，demo.json是临时接口，开发环境下，请求header.json时会给转为请求demo.json
                    'header.json': 'demo.json',
                }
            }
        }
    },

    /**
     * webpack的四大核心：入口，出口，加载器(loader)，插件(plugins)
     * */
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
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
                    'style-loader',
                    'css-loader',
                    'postcss-loader'//这个是为了给样式属性加兼容的厂商属性
                ]
            }
        ]
    },
    //插件
    plugins: [
        new webpack.HotModuleReplacementPlugin()//开发环境中需要HMR功能
    ]

}

module.exports = merge(commonConfig, devConfig);