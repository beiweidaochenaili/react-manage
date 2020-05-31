import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import { Form, Input, Button, message, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../../api/login";

import "./index.less";
const { Item } = Form
export default class Login extends Component {
    formRef = React.createRef()
    state={
        loading:false
    }
    onFinish = (value) => {
        console.log(value)
        login(value).then(res => {
            console.log(res)
            if (res.meta.status == 200) {
                message.success("登录成功")
                localStorage.setItem("token", res.data.token)
                this.props.history.push("/users")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div className="login">
                <div className="child">
                    <h1>欢迎登录</h1>
                    <Form
                        onFinish={this.onFinish}
                        ref={this.formRef}
                    >
                        <Item
                            label=""
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                            <Input prefix={<UserOutlined />} style={{ width: 250, marginTop: 20 }} placeholder="请输入用户名" />
                        </Item>
                        <Item
                            label=""
                            name="password"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                            <Input type="password" prefix={<LockOutlined />} style={{ width: 250, marginTop: 10 }} placeholder="请输入密码" />
                        </Item>
                        <Item>
                            <Spin spinning={this.state.loading} tip="登录中...">
                                <Button type="primary" htmlType="submit" onClick={()=>{this.setState({loading:true})}}>登录</Button>
                            </Spin>
                        </Item>
                    </Form>
                </div>

                <ParticlesBg type="circle" bg={true} />
            </div>
        )
    }
}
