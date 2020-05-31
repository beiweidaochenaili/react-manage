import React, { Component } from 'react'
import { Steps, Tabs, Form, Input, Select, Cascader, Tag,Upload, Button, message } from "antd"
import { getselectlist, getattr,addgoods } from "../../../api/goods"
import { Editor } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftjs from 'draftjs-to-html'
import {createHashHistory} from 'history';
const history = createHashHistory();
const { Step } = Steps
const { TabPane } = Tabs;
const { Item } = Form
export default class Addgoods extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
        this.state = {
            // current: 0,
            activeKey: "1",
            selectlist: [],
            val: {},//保存最终请求的对象
            uid: '',//保存select的id
            many: "",//保存Mnay请求回来的数据
            only:"",//保存only请求回来的数据
            editorState: '',
            editorContent:'',
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
                // console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }
    //tab也key值改变时的回调
    callback = (key) => {
        // console.log(key)
        this.setState({
            activeKey: key
        })
        this.formRef.current.submit()
        if (key == 2) {
            getattr({ id: this.state.uid, sel: "many" }).then(res => {
                // console.log(res)
                if (res.meta.status == 200) {
                    this.setState({
                        many: res.data
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
        if(key==3){
            getattr({id: this.state.uid, sel: "only"} ).then(res=>{
                // console.log(res)
                if(res.meta.status==200){
                    this.setState({
                        only:res.data
                    })
                }

            }) .catch(err=>{
                console.log(err)
            })
        }
    }
    //=======富文本编译器方法
    onEditorChange = (editorContent) => {
        let value= draftjs(editorContent)
        // console.log(value)
        let attr=this.state.many.concat(this.state.only)
        this.setState({
          editorContent:value,
          val:{...this.state.val,goods_introduce:value,attrs:attr,pic:[]}
        });
      };
    
      onEditorStateChange = (editorState) => {
        this.setState({
          editorState
        });
      };
    //from获取失败的回调
    onFinishFailed = (errorFields) => {
        // console.log(errorFields)
        if (errorFields.errorFields.length > 0) {
            this.setState({
                activeKey: "1"
            })
        }
    }
    //form收集数据的回调
    onFinish = (values) => {
        // console.log(values)
        delete values.goods_cat
        this.setState({
            val: { ...this.state.val, ...values }
        })
    }
    //下拉框选择完成
    finishselect = (value) => {
    
        const uid = value[2]
        const val = value.join()
        console.log(val)
        this.setState({
            val: { ...this.state.val, goods_cat: val },
            uid: uid
        })
    }
  
    // 上传upload的onchange方法//现在还没实现这个功能
    upload=(val)=>{
        // console.log(val)
        this.setState({
            val:{...this.state.val,pic:[]}
        })
    }
    //上传数据
    submit=()=>{
        console.log(this.state.val)
        addgoods(this.state.val).then(res=>{
            // console.log(res)
            if(res.meta.status==201){
                message.success('创建商品成功')
                history.push("/goods")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div>
                <Steps current={this.state.activeKey - 1} labelPlacement="vertical" style={{fontSize:12}}>
                    <Step style={{fontSize:12}} title="基本信息" />
                    <Step title="商品参数" />
                    <Step title="商品属性" />
                    <Step title="商品图片" />
                    <Step title="商品内容" />
                    <Step title="完成" />
                </Steps>
                <Tabs
                    activeKey={this.state.activeKey}
                    tabPosition="left"
                    onChange={this.callback}
                    style={{ marginTop: 80 }}
                >
                    <TabPane tab="基本信息" key="1">
                        <Form
                            ref={this.formRef} name="control-ref" onFinish={this.onFinish}
                            layout="vertical"
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Item
                                label="商品名称"
                                name="goods_name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input style={{ width: 450 }}></Input>
                            </Item>
                            <Item
                                label="商品价格"
                                name="goods_price"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input style={{ width: 450 }}></Input>
                            </Item>
                            <Item
                                label="商品重量"
                                name="goods_weight"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input style={{ width: 450 }}></Input>
                            </Item>
                            <Item
                                label="商品数量"
                                name="goods_number"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input style={{ width: 450 }}></Input>
                            </Item>
                            <Item
                                label="商品分类"
                                name="goods_cat"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Cascader
                                    options={this.state.selectlist}
                                    style={{ width: 450 }}
                                    onChange={this.finishselect}
                                >

                                </Cascader>
                            </Item>
                        </Form>

                    </TabPane>
                    <TabPane tab="商品参数" key="2" >
                        {/* Content of Tab Pane 2
                        <button onClick={this.onClick}>点我</button> */}
                        {this.state.many && this.state.many.map(item => {
                            // const newval = item.attr_vals.split(",")
                            return (
                                <div key={item.attr_id}>
                                    <div>{item.attr_name}</div>
                                    {/* {newval.map((val, i) => { */}
                                        {/* return ( */}
                                            <Tag
                                                style={{ display: "inline-block",padding:"5px 10px",border:"1px solid #409eff",color:"#409eff" }}
                                                closable
                                            >
                                                {item.attr_vals}
                                            </Tag>
                                        {/* ) */}
                                    {/* })} */}
                                </div>
                            )
                        })}
                    </TabPane>
                    <TabPane tab="商品属性" key="3">
                    { this.state.only && this.state.only.map(item=>{
                        return <div key={item.attr_id}>
                            <div>{item.attr_name}</div>
                            <Input value={item.attr_vals}/>
                        </div>
                    })}
                    </TabPane>
                    <TabPane tab="商品图片" key="4">
                        <Upload onChange={Upload}>
                            <Button type="primary">点击上传</Button>
                        </Upload>
                    </TabPane>
                    <TabPane tab="商品内容" key="5">
                    <div style={{border:"1px solid #aaa",height:400,borderRadius:10}}>
                            <Editor
                                editorState={this.state.editorState}
                                onContentStateChange={this.onEditorChange}
                                onEditorStateChange={this.onEditorStateChange}
                                style={{marginTop:15}}

                            />
                    </div>
                    <Button type="primary" onClick={this.submit} style={{margin:"50px 0"}}>点击上传</Button>
                    </TabPane>
                </Tabs>
                <hr />
            </div>
        )
    }
}
