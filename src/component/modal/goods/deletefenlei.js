import React, { Component } from 'react'
import { Modal, message } from 'antd'
import { deletefenlei } from "../../../api/goods"
export default class Deletefenlei extends Component {
    constructor(props){
        super(props)
    }
    deletefenlei=()=>{
        deletefenlei({id:this.props.lid}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                message.success("删除成功")
                this.props.closemodal()
                this.props.getlist()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                 <Modal
                title="提示"
                okText="确认"
                cancelText="取消"
                visible={this.props.isShow}
                onCancel={this.props.closemodal}
                onOk={this.deletefenlei}
                >
                    此操作将永久删除该商品,是否继续?
                </Modal> 
            </div>
        )
    }
}
