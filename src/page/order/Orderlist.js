import React, { Component } from 'react'
import { Input, Table } from "antd"
import { getorderlist } from "../../api/orders"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import "./orderlist.less"
import moment from "moment"
import Updateorder from '../../component/modal/order/updateorder';
import Addrinfo from '../../component/modal/order/addrinfo';
const { Search } = Input

export default class Orderlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            updatevisible: false,
            uid: "",
            attrvisible:false,
            lid:""
        }
    }
    componentDidMount() {
       this.getlist()
    }
   getlist=()=> getorderlist({ pagenum: 1, pagesize: 10 }).then(res => {
        console.log(res)
        if (res.meta.status == 200) {
            res.data.goods.forEach(element => {
                element.key = element.order_id
            });
            this.setState({
                data: res.data.goods
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
                title: '订单编号',
                dataIndex: 'order_number',
                key: 'order_number',

            },
            {
                title: '订单价格',
                dataIndex: 'order_price',
                key: 'order_price',

            },
            {
                title: '是否付款',
                dataIndex: 'pay_status',
                key: 'pay_status',
                render: (text, record) => {
                    switch (record.pay_status) {
                        case "0":
                            return <div>未付款</div>
                        case "1":
                            return <div>已付款</div>
                        default:
                            return
                    }
                }


            },
            {
                title: '是否发货',
                dataIndex: 'is_send',
                key: 'is_send',

            },
            {
                title: '下单时间',
                dataIndex: 'create_time',
                key: 'create_time',
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
                        <span className="editicon" onClick={() => { this.setState({ updatevisible: true, uid: record.order_id }) }}>
                            <EditOutlined />编辑
                        </span>
                        {/* <span className="deleteicon" onClick={()=>{this.setState({attrvisible:true,lid:record.order_id})}}>
                             <DeleteOutlined /> 
                            查看物流信息
                        </span> */}
                    </>
                }
            },
        ]
        return (
            <div className="orderlist">
                <Search
                    style={{ width: 250 }}
                    placeholder="请输入内容"
                    size="large"
                    onSearch={value => console.log(value)}
                />
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                />
                {
                    this.state.uid &&
                    <Updateorder
                        isShow={this.state.updatevisible}
                        closemodal={() => { this.setState({ updatevisible: false,uid:"" }) }}
                        uid={this.state.uid}
                        getlist={this.getlist}
                    />
                }
                {/* {
                    this.state.lid &&
                    <Addrinfo 
                    isShow={this.state.attrvisible}
                    closemodal={()=>{this.setState({attrvisible:false})}}
                    lid={this.state.lid}
                    ></Addrinfo>
                } */}
            </div>
        )
    }
}
