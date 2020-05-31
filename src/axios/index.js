import { message } from "antd";
import axios from "axios";
import qs from "qs";
//4.x版本路由跳转
import {createHashHistory} from 'history';
const history = createHashHistory();

// let base = "https://www.liulongbin.top:8888/api/private/v1";
let base = "http://www.huangzun.top:9999/api/private/v1";
// 配置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = false;
// axios.defaults.timeout = 30000;

// 请求前拦截
axios.interceptors.request.use(
    config => {
        if (config.url!=="http://www.huangzun.top:9999/api/private/v1/login") {
            if(localStorage.token){

                config.headers.common['Authorization'] = localStorage.token;
            }
        }
        return config;
    },
   
    err => {
        message.error("请求超时");
        return Promise.reject(err);
    }
);
// 返回后拦截
axios.interceptors.response.use(
    response  => {
    
    if(response.data.meta.status==400){
        console.log(response.data.meta.msg)
        history.push('/login');
    }
        return response ;
    },
    err => {
        return Promise.reject(err);
    }
);





    export function myGet(url, params) {
        let _url = base + url
        return new Promise((resolve, reject) => {
            axios.get(_url, {params}).then(function (response) {
                resolve(response.data)
            })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
    
    export  function myPost(url, params) {
        let _url = base + url
        return new Promise((resolve, reject) => {
            axios.post(_url, qs.stringify(params)).then(function (response) {
                resolve(response.data)
            })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    export  function myPut(url, params) {
        let _url = base + url
        return new Promise((resolve, reject) => {
            axios.put(_url, params).then(function (response) {
                resolve(response.data)
            })
                .catch(function (err) {
                    reject(err)
                })
        })
    }

    export  function myDelete(url, params) {
        let _url = base + url
        return new Promise((resolve, reject) => {
            axios.delete(_url, params).then(function (response) {
                resolve(response.data)
            })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
