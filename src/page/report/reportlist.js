import React, { Component } from 'react'
import { getdata } from "../../api/report"
// import ECharts from 'react-echarts';  
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
// 引入折线图
import  'echarts/lib/chart/line';
export default class Reportlist extends Component {
    constructor(props){
        super(props)
        this.state={
            option:""
        }
    }
    componentDidMount(){
        getdata().then(res=>{
            console.log(res)
            if(res.meta.status==200){
                var myChart = echarts.init(document.getElementById('main'));
                res.data.title={text:"用户来源"}
                res.data.tooltip={
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                }
                res.data.xAxis[0].boundaryGap= false
                myChart.setOption(res.data)
                // this.setState({
                //     option:res.data
                // })
            }
        }).catch(err=>{
            console.log(err)
        })
      
    }
    render() {
        
        return (
            <div id="main" style={{ width: 800, height: 400 }}>
                {/* <ECharts/> */}
            </div>
        )
    }
}
