const path=require('path');
const webpack=require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports={
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

    resolve:{
        alias:{
            'vue$': 'vue/dist/vue.common.js',
        }
    }
}