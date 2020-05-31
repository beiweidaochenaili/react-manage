import React, { Component } from 'react'
import { Modal, message } from 'antd'
import { delgoods } from "../../../api/goods"
export default class Deletegoods extends Component {
    constructor(props){
        super(props)
    }
//删除该商品
Deletegoods=()=>{
   delgoods({id:this.props.lid}).then(res=>{
    //    console.log(res)
       if(res.meta.status==200){
           message.success("删除成功")
           this.props.closemodal()
           this.props.getlist()
       }
   }) .catch(err=>{
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
                onOk={this.Deletegoods}
                >
                    此操作将永久删除该商品,是否继续?
                </Modal>
            </div>
        )
    }
}
