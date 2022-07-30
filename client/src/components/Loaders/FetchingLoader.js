import React from 'react'
import rocketGif from "../../assets/images/rocket-loader.gif"

const FetchingLoader = () => {
  return (
    <div className='fetching-loader'>
        <img src={rocketGif} alt="rocket"/>
    </div>
  )
}

export default FetchingLoader