import React, { Component } from 'react'
import { Modal, message } from 'antd'
import { deleterole } from "../../../api/quanxian"
export default class Deleterole extends Component {
    constructor(props){
        super(props)
    }
    //删除方法
    deleteroles=()=>{
        deleterole({id:this.props.lid}).then(res=>{
            if(res.meta.status==200){
                message.success("删除成功")
                this.props.closemodal()
                this.props.getrole()
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
                    cancelText="取消"
                    okText="确定"
                    visible={this.props.isShow}
                    onCancel={this.props.closemodal}
                    onOk={this.deleteroles}
                >
                    此操作将永久删除该角色,是否继续?
                </Modal>
            </div>
        )
    }
}
