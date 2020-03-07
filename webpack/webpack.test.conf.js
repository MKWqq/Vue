/**
 * 测试webpack
 * */
let baseWebpack=require('./webpack.base.conf');
let merge=require('webpack-merge');
let path=require('path');
function resolve(dir){
    return path.join(__dirname,'..',dir);
}

module.exports=merge(baseWebpack,{
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude:[
                    resolve('node_modules')
                ],
                loader: 'babel-loader',
                query:{
                    // 引入了istanbul插件来检测Coverage。安装babel-plugin-istanbul插件
                    plugins:['istanbul']
                }
            },
        ]
    }
});