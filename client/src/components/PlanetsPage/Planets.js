import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Planet from './Planet'
import logo from "../../assets/images/logo.png"
import SearchBar from '../SearchBar/SearchBar'

const fetchData = async (climate) => {
    return await axios({
        method: "POST",
        url: "/api/planets",
        data: {
            climate: climate
        },
        withCredentials: true
    }).then(res => {
        return {
            planets: res.data
        }
    })
}


const Planets = () => {
    const [planets, setPlanets] = useState([])

    const { climate } = useParams()

    useEffect(() => {
        fetchData(climate).then(res => setPlanets(res.planets))
    }, [climate])


    return (
        <>
            <div className='planets-container'>
                <Link to="/">
                    <img className='logo' src={logo} alt=""/>
                </Link>

                <SearchBar/>

                <h1 className='planet-title'>Climate: {climate}</h1>

                {planets.length > 0 ?
                <div className='planets-grid'>
                    {planets?.map(planet => <Planet planet={planet}/>)}
                </div> : <p className='no-results'>No results</p>}
            </div>
        </>
    )
}

export default Planets