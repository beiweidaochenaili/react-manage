import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { getrole,updaterole } from "../../../api/quanxian"
const { Item } = Form
export default class Updaterole extends Component {
    formRef=React.createRef()
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        getrole({id:this.props.uid}).then(res=>{
            // console.log(res)
            if(res.meta.status==200){
                const { roleName,roleDesc }=res.data
                this.formRef.current.setFieldsValue({
                    roleName,roleDesc
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    //提交form表单数据
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(value)=>{
        // console.log(value)
        updaterole({id:this.props.uid,...value}).then(res=>{
            // console.log(res)
            if(res.meta.status==200){
                message.success("更新成功")
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
                    title="编辑角色"
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
                            <Input></Input>
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
                            <Input></Input>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
