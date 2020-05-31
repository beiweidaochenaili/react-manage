import React, { Component } from 'react'
import { Modal } from 'antd'
import { addrinfo } from "../../../api/orders"
export default class Addrinfo extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        addrinfo({id:this.props.lid}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
               <Modal
               title="物流信息查询"
               visible={this.props.isShow}
               onCancel={this.props.closemodal}
               >
                </Modal> 
            </div>
        )
    }
}
