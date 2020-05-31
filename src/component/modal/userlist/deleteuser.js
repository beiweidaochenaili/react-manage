import React, { Component } from 'react'
import { Modal, message } from 'antd'
import { deleteuser } from "../../../api/user"

export default class Deleteuser extends Component {
    constructor(props){
        super(props)
    }
    //删除用户
    deleteuser=()=>{
        deleteuser({id:this.props.lid}).then(res=>{
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
                <Modal title="提示"
                visible={this.props.isShow}
                cancelText="取消"
                okText="确定"
                onCancel={this.props.closemodal}
                onOk={this.deleteuser}
                >
                    此操作将永久删除该用户,是否继续?
                </Modal>
            </div>
        )
    }
}
