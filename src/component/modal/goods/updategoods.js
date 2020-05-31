import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { getgood,setgood } from "../../../api/goods"
const { Item } = Form 
export default class Updategoods extends Component {
    formRef=React.createRef();
    constructor(props) {
        super(props)
        this.state={
            val:""
        }
    }
    componentDidMount(){
        getgood({id:this.props.uid}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                const { goods_name,goods_price,goods_weight,goods_number,add_time,cat_one_id,cat_three_id,cat_two_id } = res.data
                this.setState({
                    cat_one_id,cat_three_id,cat_two_id
                })
             this.formRef.current.setFieldsValue({
                goods_name,goods_price,goods_weight,goods_number,add_time
             })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    //修改完成提交方法
    submit=()=>{
        this.formRef.current.submit()
    }
    //form表单获取数据方法710,719,724
    onFinish=(val)=>{
        console.log(val)
        setgood({id:this.props.uid,...val,goods_cat:`${this.state.cat_one_id},${this.state.cat_two_id},${this.state.cat_three_id}`}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                message.success("商品信息修改成功")
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
                    title="修改商品信息"
                    okText="确认"
                    cancelText="取消"
                    visible={this.props.isShow}
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form ref={this.formRef} onFinish={this.onFinish} >
                        <Item
                        label="商品名称"
                        name="goods_name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input/>
                        </Item>
                        <Item
                        label="商品价格"
                        name="goods_price"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input/>
                        </Item>
                        <Item
                        label="商品重量"
                        name="goods_weight"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input/>
                        </Item>
                        <Item
                        label="商品数量"
                        name="goods_number"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input/>
                        </Item>
                        <Item
                        label="创建时间"
                        name="add_time"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input disabled/>
                        </Item>
                      
                    </Form>
                </Modal>
            </div>
        )
    }
}
