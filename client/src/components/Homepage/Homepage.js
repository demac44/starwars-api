import React, { useState } from 'react'
import "./style.css"
import bckgImg from "../../assets/images/bckg.jpg"
import SearchBar from '../SearchBar/SearchBar'


const Homepage = () => {
    return (
        <div className='homepage-container'>
            <SearchBar/>
            <img src={bckgImg} alt="" className='bckg-img'/>
        </div>
    )
}

export default Homepage