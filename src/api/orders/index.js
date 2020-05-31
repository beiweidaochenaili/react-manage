import {myGet,myPost,myPut,myDelete } from "../../axios"
//获取订单列表
export const getorderlist=(params)=>{
    return myGet("/orders",params)
}
//获取订单详情
export const getorder=(params)=>{
    return myGet(`/orders/${params.id}`)
}
//修改订单
export const updateorder=(params)=>{
    return myPut( `/orders/${params.id}`,params)
}
//查看物流信息
export const addrinfo=(params)=>{
    return myGet(`/kuaidi/${params.id}`)
}