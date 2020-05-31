import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { adduser } from "../../../api/user"
const { Item } = Form
export default class Adduser extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props)
    }
   //收集form表单数据并提交到后端
    onFinish = values => {
        console.log(values);
        adduser(values).then(res=>{
            console.log(res)
            if(res.meta.status==201){
                message.success("创建成功")
                this.props.closemodal()
                this.props.getlist()
            }
        }).catch(err=>{
            console.log(err)
        })
      };
      submit=()=>{
        this.formRef.current.submit()
      }
    render() {
        return (
            <div>
                <Modal 
                title="添加用户"
                visible={this.props.isShow}
                onCancel={this.props.closemodal}
                onOk={this.submit}
                cancelText="取消"
                okText="确定"
                >
                    <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                        <Item 
                            label=""
                            name="username"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="请输入用户名"></Input>
                        </Item>
                        <Item 
                            label=""
                            name="password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="请输入密码"></Input>
                        </Item>
                        <Item 
                            label=""
                            name="email"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="请输入邮箱地址"></Input>
                        </Item>
                        <Item 
                            label=""
                            name="mobile"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="请输入手机号码"></Input>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
