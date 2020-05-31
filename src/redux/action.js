export const type = {
    SWITCH_MENU : 'SWITCH_MENU'
}

// 菜单点击切换，修改面包屑名称
export const  switchMenu=(menuName)=> {
    // console.log(menuName)
    let father=""
    if(menuName=="用户列表"){
       father="用户管理"
    }else if(menuName=="角色列表" || menuName=="权限列表"){
        father="权限管理"
    }else if (menuName == "商品列表" || menuName=="分类参数" || menuName == "商品分类"){
        father="商品管理"
    }else if( menuName == "订单列表"){
        father="订单管理"
    }else if( menuName=="数据报表"){
        father="数据统计"
    }
    return {
        type:type.SWITCH_MENU,
        menuName,
        father
    }
}