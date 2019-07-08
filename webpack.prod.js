const commonConfig=require('./webpack.common.js');
const merge=require('webpack-merge');
const WorkboxPlugin=require('workbox-webpack-plugin')
const devConfig={
    mode: 'production',
    plugins:[
        new WorkboxPlugin.GenerateSW({
            clientsClaim:true,
            skipWaiting:true
        })
    ]
}
module.exports=merge(commonConfig, devConfig);