import React, { useState } from 'react'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Label,
  } from "bizcharts";
import DataSet from "@antv/data-set"
import './index.less'
import { pxTovw, resetLocaleString } from '../../../../utils'

const tickLineStyle={
    lineWidth: 1, 
    stroke: '#fff', 
    length: 5,
}
const lineStyle = {
    stroke: '#ffffff',
    fill: '#fff',
    lineWidth: 1
}

const textStyle =  {
    fill: '#fff', 
    fontSize: '12',
    textBaseline: 'top', // 文本基准线，可取 top middle bottom，默认为middle
}
const labelStyle = {
    textStyle: textStyle,
    autoRotate: false,
    htmlTemplate(text, item, index) {
        return `<p class="labelAxis">${text}</p>`
    }
}

const ChartMore = ({data, fetchOrderStatistics}) => {
   const [active, setActive] = useState('order')
   console.log(data)

   return <div className="chart-more">
        <div className="left">
            <div className="item-left">
                <img src={require('./assets/dingdan.png')} alt=""/>
                <span>
                 订单/个
                </span>
            </div>
            <div className="item-left">
                <img src={require('./assets/jine.png')} alt=""/>
                <span>
                订单金额
                </span>
            </div>
        </div>
        <div className="right">
            <div className="btns">
                <div className={`btn ${active === 'order' ? 'shishi' : ''}`} onClick={() => {fetchOrderStatistics(); setActive('order')}} >
                    实时
                </div>
                <div className={`btn ${active === 'fees' ? 'shishi' : ''}`} onClick={() => {fetchOrderStatistics('all'); setActive('fees')}} >
                    总计
                </div>
            </div>
            <div className="des">
               {
                   active === 'order' ? 
                   '当天订单个数：' : 
                   '总计订单个数：'
               } 
               <span>{data && (data.totalCount||0)}</span>
            </div>
            <div className="des">
               {
                   active === 'order' ? 
                   '当天订单金额：' : 
                   '总计订单金额：'
               }
               {/* {
                   !data.totalFees ? 
                   <span>0</span>:
                   
                   <span>{data && resetLocaleString(data.totalFees)}</span>
               } */}
            <span>{data && data.totalFees || 0}</span>
            </div>
        </div>
    </div>
}

const cols = {
    count: {
      tickInterval: 20,
      alias: '订单/个'
    },
    fees: {
        alias: '订单金额'
    }
}


export default ({ordersState, fetchOrderStatistics, orderLoading}) => {
    const _data = [{
        name: 'count',
    },{
        name: 'fees'
    }]
    let fields = []
    ordersState.filter((order, index)=> index< 7).forEach(order => {
        _data[0][order.hotelName] = resetLocaleString(order.count || '')
        _data[1][order.hotelName] = (resetLocaleString(order.fees || '') / 10000).toFixed(2)
        
        fields = [...fields, order.hotelName]
    })
    const ds = new DataSet();
    const dv = ds.createView().source(_data);
    dv.transform({
      type: "fold",
      fields: fields,
      // 展开字段集
      key: "酒店",
      // key字段
      value: "订单数量" // value字段
    });
    return (
        <div className="order-panel">
            <ChartMore data={ordersState[0]} fetchOrderStatistics={fetchOrderStatistics}/>
             {
                 orderLoading ? 
                 <img className='loading' src={require('../../../../assets/waiting.gif')} alt=""/> :
                 <React.Fragment>
                    <Chart 
                        className='chart' 
                        width={400} 
                        height={pxTovw(330)} 
                        data={dv} 
                        scale={cols}
                        style={{paddingTop: '20px'}}
                        forceFit>
                        
                        <Axis 
                            grid={null} 
                            name="酒店"
                            line = {lineStyle}
                            tickLine={tickLineStyle}
                            label={labelStyle}
                            autoRotate={false}
                            
                        />
                        <Axis 
                        grid={null} 
                        name="订单数量"
                        line = {lineStyle}
                        tickLine={tickLineStyle}
                        label={{textStyle: textStyle}}
                        autoRotate={false}
                        
                        />
                        {/* <Legend 
                            marker='circle'  
                            position='top-center'
                            itemFormatter={(text)=> {
                                console.log(text)
                                if(text === 'count') {
                                    return '订单/个'
                                }
                                if(text === 'fees') {
                                    return '订单金额/万元'
                                }
                            }}    
                        /> */}
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="interval"
                            position="酒店*订单数量"
                            color={['name', ['#087DDC', '#6DB9EB']]}
                            adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                            ]}
                        >
                        <Label 
                            content={["酒店*订单数量", (sales, value)=>{
                                return value;
                            }]}

                            textStyle={{
                                textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                                fill: '#C5E0FE', // 文本的颜色
                                fontSize: '12', // 文本大小
                                fontWeight: 'bold', // 文本粗细
                                textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                            }}
                        />
                        </Geom>
                    </Chart>
                 </React.Fragment>
             }
        </div>
    )
}




      
