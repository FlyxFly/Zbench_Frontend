const path=require('path');
const webpack=require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports={
    mode: 'development',
    entry: {
        'bundle': path.resolve(__dirname,'src/index.js'),
        vendor: ['jquery' ,'vue']
    },
    output:{
        filename:'[name].js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'},
            {test:/\.vue$/,use:['vue-loader']}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Vue: 'vue',
            'window.Vue': 'vue',
        }),
        new VueLoaderPlugin(),
        new UglifyJsPlugin({
            uglifyOptions:{
                compress:{
                    warnings: true,
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                },
                output:{
                    beautify: false,
                    comments: false
                }
            }
        })
    ],
    optimization: {
        splitChunks:{
            cacheGroups:{
                commons:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        compress: true,
        port: 9000
    },
    resolve:{
        alias:{
            'vue$': 'vue/dist/vue.common.js',
        }
    }
}