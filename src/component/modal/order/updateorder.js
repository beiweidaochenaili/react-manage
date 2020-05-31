import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { getorder,updateorder } from "../../../api/orders"
const { Item } = Form
export default class Updateorder extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        getorder({ id: this.props.uid }).then(res => {
            console.log(res)
            if (res.meta.status == 200) {
                this.formRef.current.setFieldsValue(res.data )
                    
                
            }
        }).catch(err => {
            console.log(err)
        })

    }
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(val)=>{
        console.log(val)
        updateorder({id:this.props.uid,...val}).then(res=>{
            console.log(res)
            if(res.meta.status==201){
                message.success("订单更新成功")
                this.props.closemodal();
                this.props.getlist();
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="修改订单信息"
                    visible={this.props.isShow}
                    okText="确定"
                    cancelText="取消"
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form ref={this.formRef} onFinish={this.onFinish}>
                        <Item
                            label="订单编号"
                            name="order_number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input disabled></Input>
                        </Item>
                        <Item
                            label="订单价格"
                            name="order_price"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input></Input>

                        </Item>
                        <Item
                            label="是否付款"
                            name="pay_status"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input disabled></Input>

                        </Item>
                        <Item
                            label="是否发货"
                            name="is_send"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input></Input>

                        </Item>
                        <Item
                            label="订单支付"
                            name="order_pay"
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
