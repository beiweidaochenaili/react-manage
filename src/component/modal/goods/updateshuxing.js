import React, { Component } from 'react'
import { Modal,Form,Input, message } from 'antd'
import { updatecanshu } from "../../../api/goods"
const { Item } = Form
export default class Updateshuxing extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
    }
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(val)=>{
        console.log(val)
        const { cat_id,attr_id,attr_sel }=this.props.mid
        updatecanshu({id:cat_id,uid:attr_id,...val,attr_sel}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                message.success("更新成功")
                this.props.closemodal()
                this.props.getonly()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="修改静态属性"
                    visible={this.props.isShow}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form
                        ref={this.formRef}
                        onFinish={this.onFinish}
                        initialValues={this.props.mid}
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
