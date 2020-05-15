import React from 'react'
import './index.less'
import PieChart from './components/PieChart'

const colors = ['#FF0000', '#FF820A', '#FFC408', '#448ACA']
export default ({occupancyRateRankState}) => {
    return (
        <div className="checkin-panel">
            {
                occupancyRateRankState.map((hotel, index) => (
                    <div className='chart-item' key={hotel.id}>
                        <div className="title">{hotel.name}</div>
                        <PieChart data={hotel} color={colors[index] || colors[3]}></PieChart>
                    </div>
                ))
            }
        </div>
    )
}



