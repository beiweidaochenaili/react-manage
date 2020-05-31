import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import App from "./App"
import Login from './page/Login'
import Home from './page/Home'
import Userlist from './page/User/Userlist'
import Goodslist from './page/goods/Goodslist'
import Rolelist from './page/quanxian/rolelist'
import Quanxianlist from './page/quanxian/quanxianlist'
import Fenlei from './page/goods/fenlei'
import Goodsfenlei from './page/goods/goodsfenlei'
import Orderlist from './page/order/Orderlist'
import Reportlist from './page/report/reportlist'
import Navleft from './component/Navleft'
import Addgoods from './page/goods/Goodslist/addgoods'
export default class Erouter extends Component {
    render() {
        return (

            <HashRouter>
                <Switch>

                    <Route path="/login" component={Login}></Route>

                    {/* <Route path="/" component={Home}></Route> */}
                    <Route path="/" render={() => (
                        <Home>
                            <Switch>
                                <Route path="/users" component={Userlist}></Route>
                                <Route path="/goods/add" component={Addgoods}></Route>
                                <Route path="/goods" component={Goodslist}></Route>
                                <Route path="/roles" component={Rolelist}></Route>
                                <Route path="/rights" component={Quanxianlist}></Route>
                                <Route path="/params" component={Fenlei}></Route>
                                <Route path="/categories" component={Goodsfenlei}></Route>
                                <Route path="/orders" component={Orderlist}></Route>
                                <Route path="/reports" component={Reportlist}></Route>
                                <Route render={() => { return <div>404页面</div> }}></Route>
                            </Switch>
                        </Home>
                    )}></Route>
                </Switch>
            </HashRouter>

        )
    }
}
