import {myGet,myPost,myPut,myDelete } from "../../axios"
//获取用户列表
export const getuserlist=(params)=>{
    return myGet("/users",params)
}
//修改用户状态
export const setuserstatus=(params)=>{
    return myPut(`/users/${params.uid}/state/${params.bool}`)
}
//添加用户
export const adduser=(params)=>{
    return  myPost("/users",params)
}
//获取具体的某一个user对象,用于修改
export const getuser=(params)=>{
    return myGet(`/users/${params.id}`)
}
//发送修改的用户信息
export const setuser=(params)=>{
    return myPut(`/users/${params.id}`,params)
}
//删除用户信息
export const deleteuser=(params)=>{
    return  myDelete(`/users/${params.id}`)
}
//获取角色列表
export const getrole=(params)=>{
    return myGet("/roles")
}
//分配用户角色
export const fenpeirole=(params)=>{
    return myPut(`/users/${params.id}/role`,params)
}