import {myGet,myPost,myPut,myDelete } from "../../axios"
//基于时间的统计折线图
export const getdata=(params)=>{
    return myGet("/reports/type/1")
}