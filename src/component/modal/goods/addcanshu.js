import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { addcanshu } from "../../../api/goods"
const { Item } = Form
export default class Addcanshu extends Component {
    formRef=React.createRef()
    constructor(props){
        super(props)
    }
    //提交数据
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(val)=>{
        console.log(val)
        addcanshu({id:this.props.lid,...val,attr_sel:"many"}).then(res=>{
            console.log(res)
            if(res.meta.status==201){
                message.success("添加成功")
                this.props.closemodal()
                this.props.getattr()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Modal
                title="添加动态参数"
                visible={this.props.isShow}
                okText="确认"
                cancelText="取消"
                onCancel={this.props.closemodal}
                onOk={this.submit}
                >
                    <Form ref={this.formRef} onFinish={this.onFinish}>
                        <Item
                         label="动态参数"
                         name="attr_name"
                         rules={[
                             {
                                 required: true,
                             },
                         ]}
                        >
                            <Input style={{width:300}}/>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
