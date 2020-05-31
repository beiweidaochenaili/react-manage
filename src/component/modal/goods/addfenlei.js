import React, { Component } from 'react'
import { Modal,Form,Input,Cascader, message } from 'antd'
import { getselectlist,addfenlei } from "../../../api/goods"
import { FormProvider } from 'antd/lib/form/context'
const { Item } =Form
export default class Addfenlei extends Component {
    formRef=React.createRef()
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        getselectlist({type:2}).then(res=>{
            // console.log(res)
            if(res.meta.status==200){
                res.data.forEach(element => {
                    element.value = element.cat_id
                    element.label = element.cat_name
                    element.key = element.cat_id
                    if (element.children) {
                        // console.log(element.children)
                        element.children.forEach((item) => {
                            // console.log(item)
                            item.value = item.cat_id
                            item.label = item.cat_name
                            item.key = item.cat_id
                            
                        })

                    }
                });
                this.setState({
                    data:res.data
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    checkedlist=(val)=>{
        console.log(val)
    }
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(val)=>{
        console.log(val)
        const { cat_name,attr_name }=val
        addfenlei({cat_name,cat_pid:attr_name[1],cat_level:2}).then(res=>{
            console.log(res)
            if(res.meta.status==201){
                message.success("添加成功")
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
                 title="添加分类"
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
                        label="分类名称"
                        name="cat_name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Input></Input>
                        </Item>
                        <Item
                        label="父籍分类"
                        name="attr_name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        >
                            <Cascader 
                            options={this.state.data}
                            onChange={this.checkedlist}
                            ></Cascader>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
