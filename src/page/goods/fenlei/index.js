import React, { Component } from 'react'
import { Cascader, Tabs, Button, Table } from "antd"
import { getselectlist, getattr } from "../../../api/goods"
import Addcanshu from '../../../component/modal/goods/addcanshu';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./index.less"
import Updatecanshu from '../../../component/modal/goods/updatecanshu';
import Deletecanshu from '../../../component/modal/goods/deletecanshu';
import Addshuxing from '../../../component/modal/goods/addshuxing';
import Updateshuxing from '../../../component/modal/goods/updateshuxing';
import Deleteshuxing from '../../../component/modal/goods/deleteshuxing';

const { TabPane } = Tabs;
export default class Fenlei extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectlist: [],
            addvisible: false,//控制添加参数模态框显示隐藏
            disabled: true,//控制按钮是否禁用
            data: [],//保存请求的参数
            lid: "",//select选中的id
            updatevisible: false,//控制修改模态框显示隐藏
            mid: "",//保存要编辑的每个参数的所有信息
            deletevisible: false,//控制删除模态框显示隐藏
            record: "",//保存要删除的参数的id
            shuxingdisable: true,//控制属性框是否禁用
            addshuxingvis: false,//控制添加属性模态框显示隐藏
            data1: [],//保存only请求回来的数据
            updateshuxingvis: false,//控制修改静态属性模态框显示隐藏
            mid1: "",//保存静态属性中要编辑的属性的所有信息
            deleteshuxingvis: false,//控制静态属性参数的删除模态框显示隐藏
            record1: ''//用来保存要删除的静态属性的id

        }
    }
    componentDidMount() {
        getselectlist().then(res => {
            // console.log(res)
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
                    selectlist: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //选中的回调
    finishselect = (val) => {
        // console.log(val)

        this.setState({
            disabled: false,
            shuxingdisable: false,
            lid: val[2]
        }, () => {

            this.getattrs()

        })

    }
    getattrs = () => getattr({ id: this.state.lid, sel: "many" }).then(res => {
        console.log(res)
        if (res.meta.status == 200) {
            res.data.forEach(ele => {
                ele.key = ele.attr_id
            })
            this.setState({
                data: res.data
            })
        }
    }).catch(err => {
        console.log(err)
    })
    getonly = () => getattr({ id: this.state.lid, sel: "only" }).then(res => {
        console.log(res)
        if (res.meta.status == 200) {
            res.data.forEach(ele => {
                ele.key = ele.attr_id
            })
            this.setState({
                data1: res.data
            })
        }
    }).catch(err => {
        console.log(err)
    })
    //当切换tab的时候
    tabchange = (key) => {
        if (key == 2 && this.state.lid) {
            this.getonly()
        }
    }
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
                title: '参数名称',
                dataIndex: 'attr_name',
                key: 'attr_name',

            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(record)
                    return <>
                        <span className="editicon" onClick={() => { this.setState({ updatevisible: true, mid: record }) }}>
                            <EditOutlined />编辑
                        </span>
                        <span className="deleteicon" onClick={() => { this.setState({ deletevisible: true, record }) }} >
                            <DeleteOutlined />删除
                        </span>
                    </>
                }

            },

        ]
        const columns1 = [
            {
                title: '#',
                dataIndex: 'num',
                key: 'num',
                render: (index, i, e) => {

                    return <div>{e + 1}</div>
                }

            },
            {
                title: '属性名称',
                dataIndex: 'attr_name',
                key: 'attr_name',

            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(record)
                    return <>
                        <span className="editicon" onClick={() => { this.setState({ updateshuxingvis: true, mid1: record }) }}>
                            <EditOutlined />编辑
                        </span>
                        <span className="deleteicon" onClick={() => { this.setState({ deleteshuxingvis: true, record1: record }) }} >
                            <DeleteOutlined />删除
                        </span>
                    </>
                }
            },
        ]
        return (
            <div className="fenlei">
                <div style={{ color: "#e6a23c" }}>注意!只允许为第三级分类设置相关参数!</div>
                选择商品分类 :
                <Cascader
                    allowClear={false}
                    options={this.state.selectlist}
                    style={{ width: 250, marginTop: 30, marginBottom: 30 }}
                    onChange={this.finishselect}
                >

                </Cascader>
                <Tabs onChange={this.tabchange}>
                    <TabPane tab="动态参数" key="1">
                        <Button
                            disabled={this.state.disabled}
                            type="primary"
                            onClick={() => { this.setState({ addvisible: true }) }}
                        >
                            添加参数
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            pagination={false}
                        >

                        </Table>
                    </TabPane>
                    <TabPane tab="静态属性" key="2">
                        <Button
                            disabled={this.state.shuxingdisable}
                            type="primary"
                            onClick={() => { this.setState({ addshuxingvis: true }) }}

                        >添加属性</Button>
                        <Table
                            columns={columns1}
                            dataSource={this.state.data1}
                            pagination={false}
                        >

                        </Table>
                    </TabPane>
                </Tabs>
                {
                    this.state.lid &&
                    <Addcanshu
                        isShow={this.state.addvisible}
                        closemodal={() => { this.setState({ addvisible: false }) }}
                        lid={this.state.lid}
                        getattr={this.getattrs}
                    >

                    </Addcanshu>
                }
                {
                    this.state.mid &&
                    <Updatecanshu
                        mid={this.state.mid}
                        isShow={this.state.updatevisible}
                        closemodal={() => { this.setState({ updatevisible: false, mid: "" }) }}
                        getattr={this.getattrs}
                    >

                    </Updatecanshu>
                }
                {
                    this.state.record &&
                    <Deletecanshu
                        isShow={this.state.deletevisible}
                        record={this.state.record}
                        closemodal={() => { this.setState({ deletevisible: false, record: "" }) }}
                        getattr={this.getattrs}
                    ></Deletecanshu>
                }
                {
                  this.state.lid &&
                    < Addshuxing
                        isShow={this.state.addshuxingvis}
                        closemodal={() => { this.setState({ addshuxingvis: false }) }}
                        lid={this.state.lid}
                        getonly={this.getonly}
                    ></Addshuxing>

                }
                {
                    this.state.mid1 &&
                    <Updateshuxing
                        isShow={this.state.updateshuxingvis}
                        mid={this.state.mid1}
                        closemodal={() => { this.setState({ updateshuxingvis: false, mid1: '' }) }}
                        getonly={this.getonly}
                    ></Updateshuxing>
                }
                {
                    this.state.record1 &&
                    <Deleteshuxing
                        isShow={this.state.deleteshuxingvis}
                        record1={this.state.record1}
                        closemodal={() => { this.setState({ deleteshuxingvis: false, record1: "" }) }}
                        getonly={this.getonly}
                    >

                    </Deleteshuxing>
                }
            </div>
        )
    }
}
