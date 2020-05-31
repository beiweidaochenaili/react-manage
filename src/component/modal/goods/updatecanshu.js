import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { updatecanshu } from "../../../api/goods"
const { Item } = Form
export default class Updatecanshu extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
    }
    onFinish = (val) => {
        // console.log(val)
        // console.log(this.props.mid)
        const { attr_id,attr_sel,cat_id}=this.props.mid
        // console.log(attr_id,attr_sel,cat_id)
        updatecanshu({id:cat_id,uid:attr_id,attr_sel,...val}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                message.success("更新成功")
                this.props.closemodal()
                this.props.getattr()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    submit = () => {
        this.formRef.current.submit()
    }
    render() {
        return (
            <div>
                <Modal
                    title="修改动态参数"
                    visible={this.props.isShow}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form ref={this.formRef} initialValues={this.props.mid} onFinish={this.onFinish}>
                        <Item
                            label="动态参数"
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
