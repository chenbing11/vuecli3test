//vue.config.js
console.log(process.env.NODE_ENV);
const port = process.env.port || 8888;
const path = require('path');
function resolve (dir){
    return path.join(__dirname,dir);
}
module.exports ={
    // configureWebpack: config => {
    //     if(process.env.NODE_ENV === 'production') {
    //         //为生产环境修改配置
    //     } else {
    //         //为开发环境修改配置
    //     }
    // }
    lintOnSave:process.env.NODE_ENV === 'production',
    devServer:{
        port,
        open:true,// 配置自动启动浏览器
        proxy:{
            [process.env.VUE_APP_BASE_API]:{
                target:'http://localhost:8000',
                changeORrigin:true,
                pathReWrite:{
                    [process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    pluginOptions:{
        'style-resources-loader': { // less安装
            preProcessor: 'less',
            patterns: [path.resolve(__dirname,'./src/assets/style/varibles.lesss')]
        }
    },
    configureWebpack:{
        resolve:{
            alias:{
                '@':resolve('src'),
                'components':resolve('src/components'),
                'utils':resolve('src/utils')
            }
        }
    }

}
