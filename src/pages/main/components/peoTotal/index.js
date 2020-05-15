import React from 'react'
import './index.less'

export default ({customerTotal}) => {
    const _num = customerTotal.padStart(9, '0').split('')
    return (
        <div className="peo-total">
            <div className="title">
                今日客流量
            </div>
            <div className="nums">
                {
                    _num.map((num, index) => (
                        <span key={index} className={`num num${index%3+1}`}>
                            {num}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}