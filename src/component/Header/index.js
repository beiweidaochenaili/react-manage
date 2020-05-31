import React, { Component } from 'react'
import { Button } from 'antd'
import "./index.less"
import {createHashHistory} from 'history';
const history = createHashHistory();
export default class Header extends Component {
 
    render() {
        return (
            <div className="content">
                    <img src={require("../../logo192.png")} alt="" className="logo"/>
                <div className="font">
                    后台管理系统
                </div>
               
                    <Button onClick={()=>{history.push("/login")}}>退出</Button>
                
            </div>
        )
    }
}
