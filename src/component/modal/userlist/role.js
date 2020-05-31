import React, { Component } from 'react'
import { Modal, Select, message } from 'antd'
import { getrole, fenpeirole } from "../../../api/user"
const { Option} = Select
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.state={
            searchKeyWordDataType:'',
            rolelist:[],
            rid:""
        }
    }
    componentDidMount() {

        getrole().then(res => {
            // console.log(res)
            if (res.meta.status == 200) {
                this.setState({
                    rolelist:res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //如果没有选择下拉里面的内容,搜索就用这个方法
    setDataType(value) {
        this.setState({
            searchKeyWordDataType: value
        });
    }
    //select框的onchange事件
    onChange=(value)=>{
        console.log(value)
        this.setState({
            rid:value
        })
    }
//修改好后提交
submit=()=>{
    fenpeirole({id:this.props.mid.id,rid:this.state.rid}).then(res=>{
        // console.log(res)
        if(res.meta.status==200){
            message.success("更新角色成功")
            this.props.closemodal()
            this.props.getlist()
        }else{
            message.error("更新角色失败")
            this.props.closemodal()
        }
    }).catch(err=>{
        console.log(err)
    })
}
    render() {
        const { searchKeyWordDataType } = this.state
        return (
            <div>
                <Modal
                    title="分配角色"
                    visible={this.props.isShow}
                    cancelText="取消"
                    okText="确定"
                    onCancel={this.props.closemodal}
                    onOk={this.submit}
                >
                    <div>当前用户:{this.props.mid.username}</div>
                    <div>当前角色:{this.props.mid.role_name}</div>
                    <Select
                        style={{ width: 200 }}
                        placeholder="请输入"
                        onChange={this.onChange}
                        showSearch
                        onSearch={value => this.setDataType(value)}
                    >
                        {
                            searchKeyWordDataType ?
                                <Option value={searchKeyWordDataType} >{searchKeyWordDataType}</Option>
                                : ''
                        }
                       {this.state.rolelist.map((item,i)=>{
                           console.log(item)
                       return <Option  key={item.id}>{item.roleName}</Option>
                       })}
                    </Select>
                </Modal>
            </div>
        )
    }
}
