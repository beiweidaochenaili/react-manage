import { myGet, myPost } from "../../axios"

//获取菜单列表
export const getmenulist=(params)=>{
    return myGet("/menus")
}
export const login=(params)=>{
    return myPost("/login",params)
}