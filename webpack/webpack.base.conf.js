/**
 * webpack基础配置
 * */
let path=require('path');

function resolve(dir){
    return path.join(__dirname,'..',dir);
}

module.exports={
    context: __dirname,
    mode: 'none',
    // devtool:'inline-source-map',
    module: {},
    resolve: {
        extensions: ['.js','.vue', '.json']
    },
};