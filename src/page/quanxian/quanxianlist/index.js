import React, { Component } from 'react'
import { Button,Table } from 'antd'
import { getquanxian } from "../../../api/quanxian"

export default class Quanxianlist extends Component {
    constructor(props){
        super(props)
        this.state={
            quanxianlist:[]
        }
    }
    componentDidMount(){
        getquanxian({type:"list"}).then(res=>{
            // console.log(res)
            if(res.meta.status==200){
                res.data.forEach(element => {
                    element.key=element.id
                });
                this.setState({
                    quanxianlist:res.data
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        const columns=[
            {
                title: '#',
                dataIndex: 'num',
                key: 'num',
                render: (index, record, e) => {

                    return <div>{e + 1}</div>
                }
            },
            {
                title: '权限名称',
                dataIndex: 'authName',
                key: 'authName',

            },
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',

            },
            {
                title: '权限等级',
                dataIndex: 'level',
                key: 'level',
                render:(text,record)=>{
                    // console.log(text)
                    // console.log(record)
                    switch (record.level) {
                        case "0":
                    return <div style={{color:"#409eff"}}>{"一级"}</div> ; 
                          case "1":
                            return <div style={{color:"#67c23a"}}>{"二级"}</div> ;   
                            case "2":
                                return <div style={{color:"#f56c6c"}}>{"三级"}</div> ; 
                        default:
                            break;
                    }
                }

            },
        ]
        return (
            <div>
               <Table
               columns={columns}
               dataSource={this.state.quanxianlist}
               >

               </Table>
            </div>
        )
    }
}
