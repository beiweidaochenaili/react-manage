import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { getuser,setuser } from "../../../api/user"
const { Item } =Form
export default class Updateuser extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props)
        this.state={
        }
    }
   componentDidMount(){
    getuser({id:this.props.uid}).then(res=>{

        if(res.meta.status==200){
            const { username,email,mobile } = res.data
            this.formRef.current.setFieldsValue({
                username,mobile,email
            })
           
        }
    }).catch(err=>{
        console.log(err)
    })
   }
   //提交收集的表单数据
   submit=()=>{
       this.formRef.current.submit()
   }
   onFinish=(value)=>{
    setuser({id:this.props.uid,...value}).then(res=>{
        if(res.meta.status==200){
            message.success("更新成功")
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
                title="修改用户信息"
                visible={this.props.isShow}
                onCancel={this.props.closemodal}
                onOk={this.submit}
                cancelText="取消"
                okText="确定"
                >
                    <Form ref={this.formRef} onFinish={this.onFinish}>
                        <Item
                         label=""
                         name="username"
                         rules={[
                             {
                                 required: true,
                             },
                         ]}
                        >
                            <Input disabled></Input>
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
                            <Input ></Input>
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
                            <Input ></Input>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
