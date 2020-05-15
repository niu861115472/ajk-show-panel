import React, { useState, useEffect } from 'react'
import './index.less'
import format from 'date-fns/format'

const _format = 'YYYY-MM-DD HH:mm:ss'
export default () => {
  const now = format(new Date(), _format)
  const [time, setTime] = useState(now)

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(format(new Date(), _format))
    }, 1000)
    return function cleanup() {
      clearTimeout(timer)
    }
  }, [time])

  const goStage = () =>{
    window.location.href = 'http://demo.live-ctrl.com/aijukex/tenement/mainPage'
  }

  return <div className='header'>
    <span className='title'>
      爱居客智慧酒店运维图
      </span>
    <span className="time" onClick={() => setTime(format(new Date(), _format))}>
      {time}
    </span>
    <div className="back-stage" onClick={goStage}>后台管理</div>
  </div>
}