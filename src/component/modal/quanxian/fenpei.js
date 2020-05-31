import React, { useState,useEffect } from 'react'
import { Modal, Tree, message } from 'antd'
import { getquanxian, roleshouquan } from "../../../api/quanxian"
export default function Fenpei(props) {

    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [ data,setData ] = useState([])
    useEffect(()=>{
        getquanxian({type:"tree"}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
         const newdata= []
         const newkey=[]
          res.data.forEach(element => {
                   element.key=element.id
                   element.title=element.authName
                   if(element.children){
                    element.children.forEach(element=>{
                        element.key=element.id
                        element.title=element.authName
                        if(element.children){
                            element.children.forEach(element=>{
                                element.key=element.id
                                element.title=element.authName
                            })
                           }
                    })
                   }
                   newdata.push(element)
               });
               console.log(newdata)
                setData(newdata)
            
            }
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const onExpand = expandedKeys => {
        // console.log('onExpand', expandedKeys); 
    
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
      };
    
      const onCheck = checkedKeys => {
        // console.log('onCheck', checkedKeys);
        setCheckedKeys(checkedKeys);
      };
    
      const onSelect = (selectedKeys, info) => {
        // console.log('onSelect', info);
        setSelectedKeys(selectedKeys);
      };
   
      const onOk=()=>{
        //   console.log(checkedKeys)
        const checked=checkedKeys.join()
        // console.log(checked)
        // console.log(props.lid)
        roleshouquan({id:props.mid,rids:checked}).then(res=>{
            console.log(res)
            if(res.meta.status==200){
                message.success("角色授权成功")
                props.closemodal()
                props.getrole()
            }else{
                message.error(res.meta.msg)
            }
        }).catch(err=>{
            console.log(err)
        })

      }
    return (
        <div>
                 <Modal
                    title="分配权限"
                    cancelText="取消"
                    okText="确定"
                    visible={props.isShow}
                    onCancel={() => { props.closemodal() }}
                    onOk={onOk}
                >
                    {data.length>0&&<Tree
                        checkable
                        defaultExpandAll={true}
                        onExpand={onExpand}
                        // expandedKeys={expandedKeys}
                        autoExpandParent={true}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={data}
                    />}
                    {/* <Button onClick={button}>点点我</Button> */}
                </Modal>
        </div>
    )
}

