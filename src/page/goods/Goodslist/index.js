import React, { Component } from 'react'
import { Button, Input, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getgoodslist } from "../../../api/goods"
import { Link } from "react-router-dom"
import moment from 'moment';
import "./index.less"
import Deletegoods from '../../../component/modal/goods/deletegoods';
import Updategoods from '../../../component/modal/goods/updategoods';
const { Search } = Input
export default class Goodslist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goodslist: [],
            lid: "",//保存删除的信息的id
            deletevisible: false,//控制删除模态框显示隐藏
            setvisible: false,//控制编辑模态框显示隐藏
            uid: ""//保存要修改的商品的id
        }
    }

    componentDidMount() {
        this.getlist()
    }
    getlist = () => getgoodslist({ pagenum: 1, pagesize: 10 }).then(res => {
        // console.log(res)
        if (res.meta.status == 200) {
            res.data.goods.forEach(element => {
                element.key = element.goods_id
            });
            this.setState({
                goodslist: res.data.goods
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
                render: (index, record, e) => {

                    return <div>{e + 1}</div>
                }
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name',
                key: 'goods_name',
                render: (text, record) => {
                    return <div style={{ maxWidth: 300 }}>{record.goods_name}</div>
                }

            },
            {
                title: '商品价格',
                dataIndex: 'goods_price',
                key: 'goods_price',

            },
            {
                title: '商品重量',
                dataIndex: 'goods_weight',
                key: 'goods_weight',

            },
            {
                title: '商品数量',
                dataIndex: 'goods_number',
                key: 'goods_number',

            },
            {
                title: '创建时间',
                dataIndex: 'add_time',
                key: 'add_time',
                render: (index, record) => {
                    return moment(index).format('YYYY-MM-DD HH:mm:ss');
                }

            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(record)
                    return <>
                        <span className="editicon" onClick={() => { this.setState({ setvisible: true, uid: record.goods_id }) }}>
                            <EditOutlined />
                        </span>
                        <span className="deleteicon" onClick={() => { this.setState({ lid: record.goods_id, deletevisible: true }) }}>
                            <DeleteOutlined />
                        </span>
                    </>
                }

            },
        ]
        return (
            <div className="goodslist">
                <Search
                    style={{ width: 250 }}
                    placeholder="请输入内容"
                    size="middle"
                    onSearch={value => console.log(value)}
                />
                <Button type="primary" className="btns" style={{ marginLeft: 30 }}>
                    <Link to="/goods/add">
                        添加商品
                </Link>
                </Button>
                <Table
                    columns={columns}
                    dataSource={this.state.goodslist}
                >

                </Table>
                {
                    this.state.lid &&
                    <Deletegoods
                        isShow={this.state.deletevisible}
                        closemodal={() => { this.setState({ deletevisible: false, lid: "" }) }}
                        lid={this.state.lid}
                        getlist={this.getlist}
                    ></Deletegoods>
                }
                {
                    this.state.uid &&
                    <Updategoods
                        uid={this.state.uid}
                        isShow={this.state.setvisible}
                        closemodal={() => { this.setState({ setvisible: false, uid: "" }) }}
                        getlist={this.getlist}
                    ></Updategoods>
                }
            </div>
        )
    }
}
