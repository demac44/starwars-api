import React from 'react'
import "./style.css"
import rocketGif from "../../assets/images/rocket-loader.gif"

const RocketLoader = () => {
  return (
    <div className='rocket-loader'>
        <img src={rocketGif} alt="rocket"/>
    </div>
  )
}

export default RocketLoader