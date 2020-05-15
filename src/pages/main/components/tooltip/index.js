import React, {useState, useEffect} from 'react';
import { notification } from 'antd'
import './index.less'

const errdata = [
    '杭州迟迟庭院白马湖 8201房间 空调线路过温',
    '杭州迟迟庭院白马湖 8101房间 主机离线',
    '将军大酒店 8401房间 卧室右情景面板离线',
    '简悦服务式公寓 8003 房间 门磁离线',
    '杭州麦尖青年文艺酒店 1031 房间 卧室感应离线',
    '杭州清荷酒店 601 房间 卫生间感应离线',
    '杭州领君酒店君悦店 1408 房间 插座线路过压',
    '杭州领君酒店君悦店 2308房间 其他线路缺相',
    '千岛湖泰博酒店 816 房间 8路开关面板离线',
    '湖墅假日酒店 8205房间 卧室窗帘离线',
]

export default ({msg}) => {
    const getRanTip = () => {
        const _rand1 = Math.floor(Math.random() * 10)
    
        let _rand2 = Math.floor(Math.random() * 10)
        while(_rand1 === _rand2) {
            _rand2 = Math.floor(Math.random() * 10)
        }
        const messNode = (
            <React.Fragment>
                <div className="tooltip">
                    {msg || errdata[_rand1]}
                </div>
                <div className="tooltip">
                    {msg || errdata[_rand2]}
                </div>
            </React.Fragment>
        )
        return messNode
    }

    const openNotification = () => {
        notification.open({
            description: getRanTip(),
            placement: 'bottomRight',
            duration: 3
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            openNotification()
        }, 1000)
        return function cleanup() {
          clearTimeout(timer)
        }
      })
   
    return (
            <div className="tip_wrap">
                {/* <div className="tooltip">
                    {msg || errdata[_rand1]}
                </div>
                <div className="tooltip">
                    {msg || errdata[_rand2]}
                </div> */}
            </div>
    )
}