import React, { useState } from 'react'


const FiltersBar = ({sortResults, filterResults}) => {
    const [order, setOrder] = useState("asc")
    const [sortBy, setSortBy] = useState(null)


    return (
        <div className='filters-container'>
            <select defaultValue={sortBy} onChange={(e) => {
            setSortBy(e.target.value)
            sortResults(e.target.value, order);
            }}>
            <option value="height">Height</option>
            <option value="age">Age</option>
            </select>

            {sortBy && <select defaultValue={order} onChange={(e) => {
            sortResults(sortBy, e.target.value)
            setOrder(e.target.value)
            }}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>}

            <select onChange={(e) => {
            filterResults(e.target.value)
            }}>
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="hermaphrodite">Hermaphrodite</option>
            </select>
        </div>  
    )
}

export default FiltersBar