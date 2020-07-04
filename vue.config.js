//vue.config.js
const path = require('path');
module.exports ={  
    // configureWebpack: config => {
    //     if(process.env.NODE_ENV === 'production') {
    //         //为生产环境修改配置
    //     } else {
    //         //为开发环境修改配置
    //     }
    // }
    pluginOptions:{
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname,'./src/assets/style/varibles.lesss')]
        }
    }
}
