import React, { Component } from 'react'
import { Input, Button, Table, Switch, message,Pagination  } from 'antd'
import { getuserlist, setuserstatus } from "../../api/user"
import { EditOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import "./userlist.less"
import Adduser from '../../component/modal/userlist/adduser';
import Updateuser from '../../component/modal/userlist/updateuser';
import Deleteuser from '../../component/modal/userlist/deleteuser';
import Role from '../../component/modal/userlist/role';
const { Search } = Input
export default class Userlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userlist: [],
            visible: false,//控制添加用户模态框显示隐藏
            updatevisible: false,//控制修改用户信息模态框显示隐藏
            uid: "",//保存每条编辑模态框弹出的对象的id
            deletevisible: false,//控制删除模态框显示隐藏
            lid: "",//保存每条删除用户信息的id
            rolevisible: false,//控制分配角色模态框的显示隐藏
            mid: "",//保存每条分配角色的全部信息,穿个子组件用
            total:"",//保存用户列表的总条数,用于分页
        }
    }
    //生命周期
    componentDidMount() {
        this.getlist()
    }
    //获取用户列表
    getlist = (a,b) => getuserlist({ pagesize: 5, pagenum: 1 }).then(res => {
        // console.log(res)
        if (res.meta.status == 200) {
            res.data.users.forEach(element => {
                element.key = element.id
            });
            this.setState({
                userlist: res.data.users,
                total:res.data.total
            })
        }
    }).catch(err => {
        console.log(err)
    })
    //用户列表改变状态按钮
    chagestatus = (checked, id) => {
        // console.log(checked)
        // console.log(id)
        setuserstatus({ uid: id, bool: !checked }).then(res => {
            // console.log(res)
            if (res.meta.status == 200) {
                message.success("设置状态成功")
                this.getlist()
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //分页方法
    // onShowSizeChange=(page,pagesize)=>{
       
    // }
    // currentchange=(page,pagesize)=>{
    //     this.getlist(pagesize,page)
    // }
    //搜索
    Search=(value)=>{
        console.log(value)
        getuserlist({pagesize: 5, pagenum: 1,query:value}).then(res=>{
            console.log(res)
            if (res.meta.status == 200) {
                res.data.users.forEach(element => {
                    element.key = element.id
                });
                this.setState({
                    userlist: res.data.users,
                    total:res.data.total
                })
            }
        }).catch(err=>{
            console.log(err)
        })
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
                title: '姓名',
                dataIndex: 'username',
                key: 'username',

            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',

            },
            {
                title: '电话',
                dataIndex: 'mobile',
                key: 'mobile',

            },
            {
                title: '角色',
                dataIndex: 'role_name',
                key: 'role_name',

            },
            {
                title: '状态',
                dataIndex: 'mg_state',
                key: 'mg_state',
                render: (text, record, index) => {
                    return (
                        <Switch
                            checked={text}
                            onClick={() => { this.chagestatus(text, record.id) }}
                        />
                    )
                }
            },

            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (index, record, i) => {
                    return (
                        <>
                            <span className="editicon" onClick={() => { this.setState({ updatevisible: true, uid: record.id }) }}>
                                <EditOutlined />
                            </span>
                            <span className="deleteicon" onClick={() => { this.setState({ deletevisible: true, lid: record.id }) }}>
                                <DeleteOutlined />
                            </span>
                            <span className="seticon" onClick={() => { this.setState({ rolevisible: true, mid: record }) }}>
                                <SettingOutlined />
                            </span>
                        </>
                    )
                }
            },
        ]
        return (
            <div className="userlist">
                <Search
                    style={{ width: 250 }}
                    placeholder="请输入内容"
                    size="middle"
                    onSearch={this.Search}
                />
                <Button type="primary" className="btns" onClick={() => { this.setState({ visible: true }) }}>添加用户</Button>
                <Table
                    style={{ marginTop: 35 }}
                    columns={columns}
                    dataSource={this.state.userlist}
                    pagination={false}
                >

                </Table>
                {/* 分页 */}
                {/* <Pagination
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange }
                    defaultCurrent={1}
                    total={this.state.total}
                    onChange={this.currentchange}
                /> */}

                {/* 添加用户模态框 */}
                <Adduser isShow={this.state.visible} closemodal={() => { this.setState({ visible: false }) }} getlist={this.getlist}></Adduser>
                {/* 修改用户模态框 */}
                {
                    this.state.uid &&
                    <Updateuser
                        isShow={this.state.updatevisible}
                        closemodal={() => { this.setState({ updatevisible: false,uid:"" }) }}
                        uid={this.state.uid}
                        getlist={this.getlist}>
                    </Updateuser>
                }
                {/* 删除用户模态框 */}
                {
                    this.state.lid &&
                    <Deleteuser
                        isShow={this.state.deletevisible}
                        closemodal={() => { this.setState({ deletevisible: false }) }}
                        lid={this.state.lid}
                        getlist={this.getlist}>
                    </Deleteuser>
                }
                {/* 角色分配模态框 */}
                {
                    this.state.mid &&
                    <Role
                        isShow={this.state.rolevisible}
                        mid={this.state.mid}
                        closemodal={() => { this.setState({ rolevisible: false }) }}
                        getlist={this.getlist}
                    >
                    </Role>
                }
            </div>
        )
    }
}
