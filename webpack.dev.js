const commonConfig=require('./webpack.common.js');
const merge=require('webpack-merge');
const path=require('path');

const devConfig={
    mode: 'development',
    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        compress: true,
        port: 9000,
        open:true
    },
}


module.exports=merge(commonConfig, devConfig);