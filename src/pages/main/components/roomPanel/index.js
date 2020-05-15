import React from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Guide,
  } from "bizcharts";
import './index.less'
import { pxTovw } from '../../../../utils'

const Text = Guide.Text

const cols = {
value: {
    min: 0,
    alias: '客房数量',
},
year: {
    range: [0, 1],
    alias: '年份'
}
};

const titleStyle = {
    offset: 50, 
    textStyle: {
      fontSize: '14',
      textAlign: 'center',
      fill: '#67C7DB',
      color: '#67C7DB',
    }, 
    position: 'center',
    // autoRotate: false,
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
const labelStyle = {
    textStyle: {
        fill: '#fff', 
        fontSize: '12',
    }
}
export default ({hotelHouseIncreaseDecreaseState}) => {
    let _data = []
    for (const key in hotelHouseIncreaseDecreaseState) {
        _data = [..._data, {year: key, value: hotelHouseIncreaseDecreaseState[key]}]
    }
    
    return (
        <div className="room-panel">
            <div className="title">智能客房增减</div>
            <Chart 
                height={pxTovw(340)}  
                // width={450} 
                // padding={{top: 'auto'}}
                data={_data} 
                scale={cols} 
                className='chart'
                forceFit>
                <Axis 
                    name="year" 
                    grid={null} 
                    line = {lineStyle}
                    tickLine={tickLineStyle}
                    label={labelStyle}
                    title={titleStyle}/>
                <Axis 
                    name="value" 
                    tickLine={tickLineStyle}
                    line = {lineStyle}
                    label={labelStyle}
                    grid={null} 
                    title={titleStyle}/>
                <Tooltip
                    crosshairs={{
                    type: "y"
                    }}
                />
                <Guide>
                    <Text
                        top= {true} // 指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
                        content= '注：虚线表示预计安装数量' // 显示的文本内容
                        style= {{
                        fill: '#fff', // 文本颜色
                        fontSize: '12', // 文本大小
                        fontWeight: 'bold' // 文本粗细
                        }} 
                    />
                </Guide>
                <Geom type="line" position="year*value" size={2} color='#FFF100' />
                <Geom
                    type="point"
                    position="year*value"
                    color='#FFF100'
                    size={4}
                    shape={"circle"}
                    style={{
                    stroke: "#fff",
                    }}
                />
            </Chart>
        </div>
    )
}

