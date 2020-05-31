import React, { Component } from 'react'
import { Button, Table, Row, Col, Tag } from 'antd'
import { getrolelist } from "../../../api/quanxian"
import { EditOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import "./index.less"
import Addrole from '../../../component/modal/quanxian/addrole';
import Updaterole from '../../../component/modal/quanxian/updaterole';
import Deleterole from '../../../component/modal/quanxian/deleterole';
import Fenpei from '../../../component/modal/quanxian/fenpei';
export default class Rolelist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rolelist: [],
            addvisible: false,//控制添加模态框是否显示
            updatevisible: false,//控制角色编辑模态框显示
            uid: "",//保存当前编辑角色的id
            deletevisible: false,//保存删除模态框的显示隐藏
            lid: "",//保存当前要删除的角色的id
            fenpeivisible:false,//控制分配权限模态框的显示隐藏
            mid:""//保存授权的角色id
        }

    }
    //生命周期
    componentDidMount() {
        this.getrole()
    }
    //获取角色列表
    getrole = () => getrolelist().then(res => {
        // console.log(res)
        res.data.forEach(element => {
            element.key = element.id
        });
        this.setState({
            rolelist: res.data
        })
    }).catch(err => {
        console.log(err)
    })
    //点击展开图标时触发的方法
    onExpand = (item, record) => {
        // console.log(item)
        // console.log(record)
        this.setState({
            expandedRowKeys: item ? [record.key] : []
        })

    }
    expandedRowRender = (record, i) => {
        // console.log(record,i)
        return <div>
            {record.children && record.children.map((item, i) => {
                return <Row key={item.id}>
                    <Col span={5}>
                        <Tag closable className="one">
                            {item.authName}
                        </Tag>
                    </Col>
                    <Col span={19}>
                        {item.children && item.children.map((items, i) => {
                            return <Row key={items.id}>
                                <Col span={7}>
                                    <Tag closable className="two">

                                        {items.authName}
                                    </Tag>
                                </Col>
                                <Col span={17}>
                                    {items.children && items.children.map((val, i) => {
                                        return <Tag key={val.id} closable className="three">{val.authName}</Tag>
                                    })}
                                </Col>
                            </Row>
                        })}
                    </Col>


                </Row>
            })}
        </div>

    }
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
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',

            },
            {
                title: '角色描述',
                dataIndex: 'roleDesc',
                key: 'roleDesc',

            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(record)
                    return <>
                        <span className="editicon" onClick={() => { this.setState({ updatevisible: true, uid: record.id }) }}>
                            <EditOutlined />编辑
                    </span>
                        <span className="deleteicon" onClick={() => { this.setState({ deletevisible: true, lid: record.id }) }}>
                            <DeleteOutlined />删除
                    </span>
                        <span className="seticon" onClick={() => { this.setState({ fenpeivisible: true, mid: record.id }) }}>
                            <SettingOutlined />分配权限
                    </span>
                    </>
                }

            },
        ]
        return (
            <div className="rolelist">
                <Button type="primary" className="btn" onClick={() => { this.setState({ addvisible: true }) }}>添加角色</Button>
                <Table
                    childrenColumnName={[]}
                    columns={columns}
                    dataSource={this.state.rolelist}
                    onExpand={this.onExpand}
                    expandedRowRender={this.expandedRowRender}
                >

                </Table>
                <Addrole
                    isShow={this.state.addvisible}
                    closemodal={() => { this.setState({ addvisible: false }) }}
                    getrole={this.getrole}
                >

                </Addrole>
                {
                    this.state.uid &&
                    <Updaterole
                        isShow={this.state.updatevisible}
                        closemodal={() => { this.setState({ updatevisible: false, uid: "" }) }}
                        uid={this.state.uid}
                        getrole={this.getrole}
                    >

                    </Updaterole>
                }
                {
                    this.state.lid &&
                    <Deleterole
                        isShow={this.state.deletevisible}
                        closemodal={() => { this.setState({ deletevisible: false }) }}
                        lid={this.state.lid}
                        getrole={this.getrole}
                    >

                    </Deleterole>
                }
                {
                    this.state.mid &&
                    <Fenpei 
                    isShow={this.state.fenpeivisible} 
                    closemodal={()=>{this.setState({fenpeivisible:false,mid:""})}}
                    mid={this.state.mid}
                    getrole={this.getrole}
                    >

                    </Fenpei>
                }
                
            </div>
        )
    }
}
