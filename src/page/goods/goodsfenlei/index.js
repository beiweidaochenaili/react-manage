import React, { Component } from 'react'
import { Button, Table } from "antd"
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { getselectlist } from "../../../api/goods"
import "./index.less"
import Addfenlei from '../../../component/modal/goods/addfenlei';
import Updatefenlei from '../../../component/modal/goods/updatefenlei';
import Deletefenlei from '../../../component/modal/goods/deletefenlei';
export default class Goodsfenlei extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            addfenleivis: false,//控制添加分类模态框显示隐藏
            updatevisible: false,//控制修改分类的模态框显示隐藏
            uid: "",//保存编辑分类里面的id
            lid:"",//保存删除分类的id
            deletevisible:false//控制删除模态框的显示隐藏

        }
    }
    componentDidMount() {
        this.getlist()
    }
    getlist = () => getselectlist().then(res => {
        console.log(res)
        if (res.meta.status == 200) {
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
                        if (item.children) {
                            // console.log(item.children)
                            item.children.forEach(items => {
                                // console.log(items)
                                items.value = items.cat_id
                                items.label = items.cat_name
                                items.key = items.cat_id
                            })
                        }
                    })

                }
            });
            this.setState({
                data: res.data
            })
        }
    }).catch(err => {
        console.log(err)
    })
    render() {
        const columns = [
            {
                title: '#',
                dataIndex: 'num',
                key: 'num',
                render: (index, i, e) => {

                    return <div>{e + 1}</div>
                }
            },
            {
                title: '分类名称',
                dataIndex: 'cat_name',
                key: 'cat_name',

            },
            {
                title: '是否有效',
                dataIndex: 'cat_deleted',
                key: 'cat_deleted',
                render: (text) => {
                    // console.log(text)
                    if (text == false) {
                        return <CheckCircleTwoTone twoToneColor="#52c41a" />
                    }
                }


            },
            {
                title: '排序',
                dataIndex: 'cat_level',
                key: 'cat_level',
                render: (text, record) => {
                    // console.log(text, record)
                    switch (text) {
                        case 0:
                            return <div style={{ color: "#409eff" }}>一级</div>
                        case 1:
                            return <div style={{ color: "#67c23a" }}>二级</div>
                        case 2:
                            return <div style={{ color: "#e6a23c" }}>三级</div>
                        default:
                            return
                    }
                }

            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(text)
                    // console.log(record)
                    return (
                        <>
                            <span className="editicon" onClick={() => { this.setState({ updatevisible: true, uid: record.cat_id }) }}>
                                <EditOutlined />编辑
                            </span>
                            <span className="deleteicon" onClick={() => { this.setState({ deletevisible: true, lid: record.cat_id }) }}>
                                <DeleteOutlined />删除
                            </span>
                        </>
                    )
                }
            },
        ]
        return (
            <div className="goodsfenlei">
                <Button type="primary" onClick={() => { this.setState({ addfenleivis: true }) }}>添加分类</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                >

                </Table>
                <Addfenlei
                    isShow={this.state.addfenleivis}
                    closemodal={() => { this.setState({ addfenleivis: false }) }}
                    getlist={this.getlist}
                >

                </Addfenlei>
                {
                    this.state.uid &&
                    <Updatefenlei
                        isShow={this.state.updatevisible}
                        closemodal={() => { this.setState({ updatevisible: false ,uid:""}) }}
                        uid={this.state.uid}
                        getlist={this.getlist}
                    >

                    </Updatefenlei>
                }
                {
                    this.state.lid &&
                    <Deletefenlei
                    isShow={this.state.deletevisible}
                    closemodal={()=>{this.setState({deletevisible:false})}}
                    lid={this.state.lid}
                    getlist={this.getlist}
                    >

                    </Deletefenlei>
                }
            </div>
        )
    }
}
