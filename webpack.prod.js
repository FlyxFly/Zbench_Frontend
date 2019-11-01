const commonConfig=require('./webpack.common.js');
const merge=require('webpack-merge');
const devConfig={
    mode: 'production',
    plugins:[
    ]
}
module.exports=merge(commonConfig, devConfig);