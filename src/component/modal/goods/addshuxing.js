import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { addcanshu } from "../../../api/goods"
const { Item } = Form
export default class Addshuxing extends Component {
    formRef=React.createRef()
    constructor(props){
        super(props)
    }
 
    onFinish=(val)=>{
        console.log(val)
        addcanshu({id:this.props.lid,...val,attr_sel:"only"}).then(res=>{
            console.log(res)
            if(res.meta.status==201){
                message.success("创建成功")
                this.props.closemodal()
                this.props.getonly()
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
                    title="添加静态属性"
                    okText="确认"
                    cancelText="取消"
                    visible={this.props.isShow}
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    >
                        <Item
                        label="静态属性"
                        name="attr_name"
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
