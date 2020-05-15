import React from 'react';
import { toLocaleString } from '../../../../../../utils'
import './index.less'

export default ({data}) => {
    return (
        <div className="hotel-item">
            <img src={data.mainPicture} alt=""/>
            <div className="content">
                <div className="item first">
                    <span className='name'>{data.name}</span>
                    <span className='normal'>目前设备正常运行<strong className='day'>{toLocaleString(data.hotelStatistics.dateCount)}</strong>天</span>
                </div>
                <div className="item">
                    <div className="item-left">
                        <div className="normal">今日客流量：{data.hotelStatistics.todayCount}人</div>
                        <div className="normal">目前客房数量：{data.hotelStatistics.houseCount}间</div>
                    </div>
                    <div className="item-right">
                        <div className="normal">总计客流量：{data.hotelStatistics.totalCount}人</div>
                        <div className="normal">智能设备数量：{data.hotelStatistics.deviceCount}个</div>
                    </div>
                </div>
                <div className="item">
                    <span className="normal">安全隐患排除次数：{data.troubleCount}次</span>
                </div>
            </div>
        </div>
    )
}