import React from 'react'
import {
    Chart,
    Geom,
    Axis,
    Coord,
    Guide,
  } from "bizcharts";
import DataSet from "@antv/data-set"

export default ({data, color}) => {
    const { DataView } = DataSet;
    const { Html } = Guide;

    const rate = (data.rate.replace("%","") / 100)
    const _data = [{
        item: '入住',
        count: rate
    },{
        item: '未入住',
        count: 1 - rate
    }]
    const dv = new DataView();
    dv.source(_data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
        type: 'timeCat',
        percent: {
            formatter: val => {
            val = val * 100 + "%";
            return val;
            }
        }
    };
    return (
        <Chart
                height={65}
                width={65}
                data={dv}
                scale={cols}
                padding={[2]}
                // forceFit
            >
                <Coord type={"theta"} radius={1} innerRadius={0.9}  />
                <Axis name="percent" />
                <Guide>
                    <Html
                    position={["50%", "50%"]}
                    html={`<div class='htmlguide'>${data.rate}</div>`}
                    alignX="middle"
                    alignY="middle"
                    />
                </Guide>
                <Geom
                    type="intervalStack"
                    position="percent"
                    color={['item', [color, 'rgba(68,138,202, 0.1)']]}
                   
                    style={{
                    lineWidth: 1,
                    stroke: "#fff"
                    }}
                >
                </Geom>
            </Chart>
    )
}