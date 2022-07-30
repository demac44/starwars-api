import React, { useState } from 'react'
import "./style.css"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const search = (e) => {
        e.preventDefault()

        window.location.href = "/movies/"+searchQuery
    }

    return (
        <div className='search-container'>
            <form onSubmit={search}>
                <input 
                    type="text" 
                    placeholder='Search...' 
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
            </form>
        </div>
    )
}

export default SearchBar