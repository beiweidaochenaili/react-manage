import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { addrole } from "../../../api/quanxian"
const { Item }= Form
export default class Addrole extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props)

    }
    //提交form表单数据
    onFinish=(value)=>{
        // console.log(value)
        addrole(value).then(res=>{
            // console.log(res)
            if(res.meta.status==201){
                message.success("创建成功")
                this.props.closemodal()
                this.props.getrole()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    submit=()=>{
        this.formRef.current.submit()
    }
    render() {
        return (
            <div>
                <Modal
                    title="添加角色"
                    cancelText="取消"
                    okText="确定"
                    visible={this.props.isShow}
                    onCancel={this.props.closemodal} 
                    onOk={this.submit}
                >
                    <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Item
                         label="角色名称"
                         name="roleName"
                         rules={[
                             {
                                 required: true,
                             },
                         ]}
                        >
                           <Input ></Input> 
                        </Item>
                        <Item
                         label="角色描述"
                         name="roleDesc"
                         rules={[
                             {
                                 required: true,
                             },
                         ]}
                        >
                          <Input ></Input>   
                        </Item>
                    </Form>

                </Modal>
            </div>
        )
    }
}
