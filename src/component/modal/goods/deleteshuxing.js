import React, { Component } from 'react'
import { Modal, message } from "antd"
import { deletecanshu } from "../../../api/goods"
export default class Deleteshuxing extends Component {
    constructor(props) {
        super(props)
    }
    deletecanshu = () => {
        const { cat_id, attr_id } = this.props.record1
        deletecanshu({ cat_id, attr_id }).then(res => {
            console.log(res)
            if(res.meta.status==200){
                message.success("删除成功")
                this.props.closemodal();
                this.props.getonly();
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    visible={this.props.isShow}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.props.closemodal}
                    onOk={this.deletecanshu}
                >
                    此操作将永久删除该参数,是否继续?
                </Modal>
            </div>
        )
    }
}
