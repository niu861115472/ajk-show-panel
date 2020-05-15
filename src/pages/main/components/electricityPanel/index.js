import React from 'react';
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
  } from "bizcharts";
import './index.less'
import { pxTovw } from '../../../../utils'

const data = [
    {
      year: "漏电",
      sales: 150
    },
    {
      year: "过压",
      sales: 52
    },
    {
      year: "欠压",
      sales: 61
    },
    {
      year: "过流",
      sales: 145
    },
    {
      year: "过温",
      sales: 48
    },
    {
      year: "短路",
      sales: 38
    },
    {
      year: "却相",
      sales: 38
    },
  ];
  const cols = {
    year: {
      tickInterval: 20,
      alias: '隐患因素'
    },
    sales: {
        alias: '次数'
    }
}

const titleStyle = {
    offset: 30, 
    textStyle: {
      fontSize: '12',
      textAlign: 'center',
      fill: '#67C7DB',
      color: '#67C7DB',
    }, 
    position: 'center',
    
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


export default () => {

    return (
        <div className="electricity-panel">
            <div className="title">用电安全监测</div>
            <Chart 
                className='chart' 
                height={pxTovw(330)} 
                style={{paddingBottom: '20px'}}
                data={data} 
                scale={cols} forceFit>
                <Axis 
                    name="year" 
                    grid={null} 
                    line = {lineStyle}
                    tickLine={tickLineStyle}
                    label={labelStyle}
                    title={titleStyle}
                    />
                <Axis 
                    name="sales" 
                    grid={null} 
                    line = {lineStyle}
                    tickLine={tickLineStyle}
                    label={labelStyle}
                    title={{...titleStyle, offset: 50}}
                />
                <Tooltip
                    crosshairs={{
                    type: "y"
                    }}
                />
                <Geom 
                    type="interval"
                    color={['sales', '#0036FF-#087DDC']} 
                    position="year*sales" />
            </Chart>
        </div>
    )
}
