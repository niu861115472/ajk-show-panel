import React from 'react'
import './index.less'
import ReactPaginate from 'react-paginate'

import HotelItem from './components/hotelItem'

export default ({hotelsState, totalPage, fetchHotelStatistics}) => {

    const pageChange = (e) => {
        const _pageNo = e.selected + 1
        fetchHotelStatistics(_pageNo)
    }
    return <div className="hotel-panel">
        {
            hotelsState.map(hotel => (
                <HotelItem key={hotel.id} data={hotel} />
            ))
        }
        <ReactPaginate
            containerClassName='paginateContainer'
            pageClassName='page'
            breakClassName='breakClassName'
            previousClassName='btnClassName'
            nextClassName='btnClassName'
            pageLinkClassName='pageLinkClassName'
            previousLinkClassName='previousLinkClassName'
            nextLinkClassName='nextLinkClassName'
            activeClassName='activeClassName'
            previousLabel='上一页'
            nextLabel='下一页'
            pageCount={totalPage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={5}
            onPageChange={pageChange}
        />
    </div>
}