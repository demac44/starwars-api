import React from 'react'
import "./style.css"
import bckgImg from "../../assets/images/bckg.jpg"
import HomepageSearch from '../SearchBar/HomepageSearch'


const Homepage = () => {
    return (
        <div className='homepage-container'>
            <HomepageSearch/>

            <img src={bckgImg} alt="" className='bckg-img'/>
        </div>
    )
}

export default Homepage