import {myGet,myPost,myPut,myDelete } from "../../axios"
//获取角色列表
export const getrolelist=(params)=>{
    return myGet("/roles")
}
//添加角色
export const addrole=(params)=>{
    return myPost("/roles",params)
}
//获取某个角色的具体信息
export const getrole=(params)=>{
    return myGet(`/roles/${params.id}`)
}
//更新角色信息
export const updaterole=(params)=>{
    return myPut(`/roles/${params.id}`,params)
}
//删除具体角色
export const deleterole=(params)=>{
    return myDelete(`/roles/${params.id}`)
}
//获取所有权限列表
export const getquanxian=(params)=>{
    return myGet(`/rights/${params.type}`)
}
//角色授权
export const roleshouquan=(params)=>{
    return myPost(`/roles/${params.id}/rights`,params)
}