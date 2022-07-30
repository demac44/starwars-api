import React, { useState } from 'react'
import "./style.css"
import bckgImg from "../../assets/images/bckg.jpg"


const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState("")

    const search = (e) => {
        e.preventDefault()

        window.location.href = "/movies/"+searchQuery
    }

    return (
        <div className='homepage-container'>
            <img src={bckgImg} alt="" className='bckg-img'/>
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

export default Homepage