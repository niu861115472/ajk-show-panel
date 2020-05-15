import React from 'react'
import { toLocaleString } from '../../../../utils'
import './index.less'

export default ({customerCount, dateCount, deviceCount, hostCount, houseCount}) => {
    return (
        <div className="totalPanel">
            <div className="title">爱居客为您提供酒店一站式服务</div>
            <div className="static">
                <div className="item">
                    <span>已经运行</span>
                    <div className="num">{toLocaleString(dateCount)}</div>
                    <span className='bule1'>天</span>
                </div>
                <div className="item">
                    <span>客流总量</span>
                    <div className="num">{toLocaleString(customerCount)}</div>
                    <span className='bule1'>人</span>
                </div>
                <div className="item">
                    <span>客房总量</span>
                    <div className="num">{toLocaleString(houseCount)}</div>
                    <span className='bule1'>间</span>
                </div>
                <div className="item">
                    <span>设备总量</span>
                    <div className="num">{toLocaleString(deviceCount)}</div>
                    <span className='bule1'>个</span>
                </div>
            </div>
        </div>
    )
}