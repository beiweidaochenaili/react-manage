import {myGet,myPost,myPut,myDelete } from "../../axios"
//获取商品列表
export const getgoodslist=(params)=>{
    return myGet("/goods",params)
}
//获取商品分类数据列表
export const getselectlist=(params)=>{
    return myGet("/categories",params)
}
//获取商品参数列表
export const getattr=(params)=>{
    return myGet(`/categories/${params.id}/attributes?sel=${params.sel}`)
}
//添加商品
export const addgoods=(params)=>{
    return myPost("/goods",params)
}
//删除某个商品
export const delgoods=(params)=>{
    return myDelete(`/goods/${params.id}`)
}
//根据id查询商品
export const getgood=(params)=>{
    return myGet(`/goods/${params.id}`)
}
//编辑商品提交
export const setgood=(params)=>{
    return myPut(`/goods/${params.id}`,params)
}
//添加动态参数或静态属性
export const addcanshu=(params)=>{
    return myPost(`/categories/${params.id}/attributes`,params)
}
//编辑提交参数
export const updatecanshu=(params)=>{
    return myPut(`/categories/${params.id}/attributes/${params.uid}`,params)
}
//删除参数
export const deletecanshu=(params)=>{
    return myDelete(`/categories/${params.cat_id}/attributes/${params.attr_id}`)
}
//添加商品分类
export const addfenlei=(params)=>{
    return myPost("/categories",params)
}
//根据id查询分类
export const getfenlei=(params)=>{
    return myGet(`/categories/${params.id}`)
}
//编辑提交分类
export const putfenlei=(params)=>{
    return myPut(`/categories/${params.id}`,params)
}
//删除分类
export const deletefenlei=(params)=>{
    return myDelete(`/categories/${params.id}`)
}