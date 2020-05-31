import React, { Component } from 'react'
import { getmenulist } from "../../api/login"
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    AppstoreOutlined,
    ConsoleSqlOutlined,
    ProfileOutlined,
    WalletOutlined,
    UsergroupDeleteOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom"
import "./index.less"
import Userlist from '../../page/User/Userlist';
import Goodslist from '../../page/goods/Goodslist';
import { connect } from "react-redux"
import { switchMenu } from "../../redux/action"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu
@connect(
    state => ({
        menuName: state.menuName,
        father: state.father
    })
)
class Navleft extends Component {
    rootSubmenuKeys = ["125", "101", "102", "103", "145"]
    constructor(props) {
        super(props)
        this.state = {
            menulist: [],
            collapsed: false,
            openKeys: [],
            currentKey: [],
        }
    }
    componentWillMount(){
        if(sessionStorage.getItem("openkeys") && sessionStorage.getItem("openkeys").length>0){
            let open=sessionStorage.getItem("openkeys").split(",").pop()
            // console.log(open)
        this.setState({
            openKeys:[open]
        })
      
        }
        // console.log(sessionStorage.getItem("openkeys"))
        // console.log(sessionStorage.getItem("key"))
        if(sessionStorage.getItem("key") && sessionStorage.getItem("key").length>0){
            let open=sessionStorage.getItem("key")
            console.log(open)
        this.setState({
            currentKey:[open]
        })
      
        }
        console.log(sessionStorage.getItem("item"))
        if(sessionStorage.getItem("item") && sessionStorage.getItem("item").length>0){
            let item=sessionStorage.getItem("item")
            this.props.dispatch(switchMenu(item))
        }
    }
    componentDidMount() {
        getmenulist().then(res => {
            // console.log(res)
            if (res.meta.status == 200) {
                this.setState({
                    menulist: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    onOpenChange = openKeys => {
        // console.log(openKeys)
        sessionStorage.setItem("openkeys","")
        sessionStorage.setItem("openkeys",openKeys)

        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };
    //根据id判断用什么图标
    geticon = (id) => {
        switch (id) {
            case 125:
                return <UserOutlined />
            case 103:
                return <AppstoreOutlined />
            case 145:
                return <ConsoleSqlOutlined />
            case 102:
                return <ProfileOutlined />
            case 101:
                return <WalletOutlined />
            case 110:
                return <UsergroupDeleteOutlined />
            // case 111:
            //     return <DatabaseOutlined />
            // case 112:
            //     return <DatabaseOutlined />
            default:
                return <DatabaseOutlined />
        }
    }
    // 菜单点击
    handleClick = ({ item, key }) => {
        console.log(item.props.children[1].props.children[1])
        sessionStorage.setItem("item","")
        sessionStorage.setItem("item",item.props.children[1].props.children[1])
        sessionStorage.setItem("key","")
        sessionStorage.setItem("key",key)
        if (key == this.state.currentKey) {
            return false;
        }
        // 事件派发，自动调用reducer，通过reducer保存到store对象中
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.children[1].props.children[1]));

        this.setState({
            currentKey: key,

        });
        // hashHistory.push(key);
    };
    render() {
        const { menuName, menuType, father } = this.props;
        // console.log(this.props)
        return (

            <Layout className="navleftheight" >
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}

                >
                    {/* <div className="logo" /> */}
                    <Menu
                        onClick={this.handleClick}
                        theme="dark"
                        mode="inline"
                        selectedKeys={this.state.currentKey}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}>
                        {this.state.menulist.map((item, i) => {
                            return <SubMenu
                                key={item.id}
                                title={
                                    <span>
                                        {this.geticon(item.id)}
                                        <span>{item.authName}</span>
                                    </span>

                                }
                            >
                                {item.children && item.children.map((items, i) => {
                                    return <Menu.Item key={items.id} style={{ color: "#fff" }}>
                                        <Link to={`/${items.path}`} onClick={this.changebread}>
                                            {this.geticon(items.id)}{items.authName}
                                        </Link>
                                    </Menu.Item>
                                })}
                            </SubMenu>
                        })}

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{father || "用户管理"}</Breadcrumb.Item>
                            <Breadcrumb.Item>{menuName || "用户列表"}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, }}>

                            {this.props.props}

                        </div>
                    </Content>
                </Layout>
            </Layout>

        )
    }
}
// const mapStateToProps = state => {
//     return {
//         menuName: state.menuName,
//         father:state.father
//     }
// };
// export default connect(mapStateToProps)(Navleft)
export default Navleft




