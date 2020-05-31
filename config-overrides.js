const { override, fixBabelImports,addLessLoader,addBabelPlugins } = 
require('customize-cra'); 
module.exports = override( 
fixBabelImports('import', { 
libraryName: 'antd', 
libraryDirectory: 'es', 
style:true, 
}), 
addLessLoader({
    // true 表示支持 less 样式文件格式
    javascriptEnabled: true, 
}),
addBabelPlugins( // ⽀持装饰器写法
    [ '@babel/plugin-proposal-decorators',
    {
    legacy: true
    }
    ]
    ),
);