import React, { Component } from 'react'
import Header from "../../component/Header"
import Navleft from '../../component/Navleft'
import { Row, Col } from 'antd'
import "./index.less";

export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div >
                <Row >
                    <Col span={24}>
                        <Header></Header>
                    </Col>
                </Row>
                <Row>

                    <Navleft props={this.props.children}></Navleft>
                </Row>
                
            </div>
        )
    }
}
