import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { getfenlei,putfenlei } from "../../../api/goods"
const { Item } = Form
export default class Updatefenlei extends Component {
    formRef=React.createRef()
    constructor(props) {
        super(props)
        this.state={
            list:[]
        }
    }
    componentDidMount(){
        getfenlei({id:this.props.uid}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                // res.data.key=res.data.cat_id
                // this.setState({
                //     list:res.data
                // })
                this.formRef.current.setFieldsValue({
                    cat_name:res.data.cat_name
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    submit=()=>{
        this.formRef.current.submit()
    }
    onFinish=(val)=>{
        // console.log(val)
        putfenlei({id:this.props.uid,...val}).then(res=>{
            // console.log(res)
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
                    title="编辑分类"
                    visible={this.props.isShow}
                    okText="确认"
                    cancelText="取消"
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <Form ref={this.formRef} onFinish={this.onFinish} initialValues={this.state.list}>
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
                    </Form>
                </Modal>
            </div>
        )
    }
}
