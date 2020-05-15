import React, { useState } from 'react'
import './index.less'
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Label,
  } from "bizcharts";
import './index.less'
import { pxTovw, resetLocaleString } from '../../../../utils'


  const cols = {
    hotelName: {
        alias: '酒店'
      },
      power: {
        //   tickInterval: 20,
          alias: '能耗统计/功率'
      }
}

const titleStyle = {
    offset: 40, 
    textStyle: {
      fontSize: '12',
      textAlign: 'center',
      fill: '#67C7DB',
      color: '#67C7DB',
    }, 
    position: 'center'
}
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
const textStyle = {
    fill: '#fff', 
    fontSize: '12',
}
const labelStyle = {
    textStyle: textStyle,
    autoRotate: false,
    htmlTemplate(text) {
        return `<p class="labelAxis">${text}</p>`
    }
}


const ChartMore = ({data, fetchPowerStatistics}) => {
    const [active, setActive] = useState('shishi')
    return <div className="chart-more">
        <div className="btns">
            <div 
            className={`btn ${active === 'shishi' ? 'intime' : ''}`}
            onClick={() => {
                fetchPowerStatistics();
                setActive('shishi')
            }}
            >
                实时
            </div>
            <div 
            className={`btn ${active === 'total' ? 'intime' : ''}`}
            onClick={() => {
                fetchPowerStatistics('all');
                setActive('total')
            }}
            >
                总计
            </div>
        </div>
        <div className="des" style={{textAlign: 'right'}}>
        {
            active === 'shishi' ? 
            '实时功率：':
            '总计功率：'
        }
        <span style={{color: '#0CD532'}}>{data && (data.totalPowers || 0)}</span>
        </div>
    </div>
}


export default ({powersState, fetchPowerStatistics, powerLoading}) => {
    const _data = powersState.filter((power, index)=> index < 7).map(hotel => ({'hotelName': hotel.hotelName, 'power': resetLocaleString(hotel.totalPower || '') }))
    return (
        <div className="power-panel">
            <ChartMore data={powersState[0]} fetchPowerStatistics={fetchPowerStatistics}/>
            {
                powerLoading ?
                <img className='loading' src={require('../../../../assets/waiting.gif')} alt=""/> :
                <Chart className='chart' height={pxTovw(310)} width={450} data={_data} scale={cols} forceFit>
                    <Axis 
                        name="hotelName" 
                        grid={null} 
                        line = {lineStyle}
                        tickLine={tickLineStyle}
                        label={labelStyle}
                        />
                    <Axis 
                        name="power" 
                        grid={null} 
                        line = {lineStyle}
                        tickLine={tickLineStyle}
                        label={{textStyle: textStyle, autoRotate: false,}}
                        title={titleStyle}
                    />
                    <Tooltip
                        crosshairs={{
                        type: "y"
                        }}
                    />
                    <Geom 
                        type="interval"
                        color={['power', ['#0CD532', '#0CD582', '#0CC4D5', '#DA814B']]} 
                        position="hotelName*power">
                        <Label 
                        content={["hotelName*power", (sales, value)=>{
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

            }
        </div>  
    )
}