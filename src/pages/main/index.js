import React from 'react'
import { notification } from 'antd'
import './index.less'

import Header from './components/header'
import TotalPanel from './components/totalPanel'
import RoomPanel from './components/roomPanel'
import ElectricityPanel from './components/electricityPanel'
import OrderPanel from './components/orderPanel'
import PowerPanel from './components/powerPanel'
import CheckInPanel from './components/checkInPanel'
import PeoTotal from './components/peoTotal'
import HotelPanel from './components/hotelPanel'
import Footer from './components/footer'
// import ToolTip from './components/tooltip'

const token = 'RQsb3e69V1ZNeGNVeFhjM1JoUnprd1dsZDRTV0l5TVd3PQC3hhBsZ8ZoOUj5bO=='
const PAGESIZE = 3
const URL = 'http://demo.live-ctrl.com/aijukex'

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

class Main extends React.Component {
    state = {
        customerTotal: '',
        hotelHouseIncreaseDecreaseState: [],
        hotelsState: [],
        ordersState: [],
        powersState: [],
        occupancyRateRankState: [],
        totalPage: 1,
        pageCurrent: 0,
        records: 0,
    }

    componentDidMount() {
        this.fetchFlowStatis()
        this.fetchCustomerToday()
        this.fetchHouseIncreaseDecrease()
        this.fetchHotelStatistics(1)
        this.fetchOrderStatistics()
        this.fetchPowerStatistics()
        this.fetchoccupancyRateRank()
        // 今日客流量
        setInterval(() => {
            this.fetchCustomerToday()
        }, 600000)
        
        this.sendRandTips()
        setInterval(() => {
            this.sendRandTips()
        }, 60000 * 5)
    }

    sendRandTips = () => {
        const _rand1 = Math.floor(Math.random() * 10)
    
        let _rand2 = Math.floor(Math.random() * 10)
        while(_rand1 === _rand2) {
            _rand2 = Math.floor(Math.random() * 10)
        }
        const messNode = (
            <React.Fragment>
                <div className="tooltip">
                    {errdata[_rand1]}
                </div>
                <div className="tooltip">
                    {errdata[_rand2]}
                </div>
            </React.Fragment>
        )
    
        notification.open({
            description: messNode,
            placement: 'bottomRight',
            duration: 15
        });
    }
    
    fetchFlowStatis = () => {
        fetch(`${URL}/hm/hm_flowStatistics?token=${token}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    flowStatisticsState: res.dataObject
                })
            }
        })
    }

    // 当天入住实时留客
    fetchCustomerToday = () => {
        fetch(`${URL}/hm/hm_actualTimeInStatistics?token=${token}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    customerTotal: res.dataObject
                })
            }
        })
    }

    // 客房增减
    fetchHouseIncreaseDecrease = () => {
        fetch(`${URL}/hm/hm_hotelHouseIncreaseDecrease?token=${token}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    hotelHouseIncreaseDecreaseState: res.dataObject
                })
            }
        })
    }
    //酒店信息统计
    fetchHotelStatistics = (pageNo) => {
        // const { pageCurrent, totalPage } = this.state
        // if(pageCurrent + 1 > totalPage) return
        fetch(`${URL}/hm/hm_hotelStatistics?token=${token}&pageSize=${PAGESIZE}&pageNo=${pageNo}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    hotelsState: res.result,
                    pageCurrent: res.pageNo,
                    totalPage: res.totalPages,
                    records: res.records
                })
            }
        })
    }
    // 酒店订单统计
    fetchOrderStatistics = (type) => {
        this.setState({
            orderLoading: true
        })
        let _url = `${URL}/hm/hm_orderStatistics?token=${token}`
        if(type) {
            _url = _url + '&type=all'
        }
        fetch(_url)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    ordersState: res.dataObject,
                    orderLoading: false
                })
            }
        })
    }
    // 酒店用电统计
    fetchPowerStatistics = (type) => {
        this.setState({
            powerLoading: true
        })
        let _url = `${URL}/hm/hm_powerStatistics?token=${token}`
        if(type) {
            _url = _url + '&type=all'
        }
        fetch(_url)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    powersState: res.dataObject,
                    powerLoading: false
                })
            }
        })
    }
    // 酒店入住率排行
    fetchoccupancyRateRank = () => {
        fetch(`${URL}/hm/hm_occupancyRateRank?token=${token}`)
        .then(res => res.json())
        .then(res => {
            if(res.success) {
                this.setState({
                    occupancyRateRankState: res.dataObject
                })
            }
        })
    }
    render() {
        const { 
            flowStatisticsState, 
            customerTotal, 
            hotelHouseIncreaseDecreaseState,
            hotelsState,
            ordersState,
            orderLoading,
            powersState,
            powerLoading,
            occupancyRateRankState,
            pageCurrent,
            totalPage,
            hasWarning
         } = this.state
        return (
            <div className="main">
                <Header></Header>
                <TotalPanel 
                    {...flowStatisticsState}
                />
                <RoomPanel 
                    hotelHouseIncreaseDecreaseState={hotelHouseIncreaseDecreaseState}
                />
                <ElectricityPanel></ElectricityPanel>
                <div className="right-panel">
                    <OrderPanel 
                        ordersState={ordersState}
                        orderLoading={orderLoading}
                        fetchOrderStatistics={this.fetchOrderStatistics}
                    />
                    <PowerPanel 
                        powersState={powersState}
                        powerLoading={powerLoading}
                        fetchPowerStatistics={this.fetchPowerStatistics}
                    />
                    <CheckInPanel 
                        occupancyRateRankState={occupancyRateRankState}
                    />
                </div>
                <div className="center-content">
                    <PeoTotal 
                        customerTotal={customerTotal}
                    />
                    <HotelPanel 
                        hotelsState={hotelsState}
                        pageCurrent={pageCurrent}
                        totalPage={totalPage}
                        fetchHotelStatistics={this.fetchHotelStatistics}
                    />
                </div>
                <Footer />

                }
            </div>
        );
    }
}

export default Main;