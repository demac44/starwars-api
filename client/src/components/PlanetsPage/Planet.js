import React from 'react'

const Planet = ({planet}) => {
  return (
    <div className='planet-card'>
        <h5 className='title'>{planet.planet.name}</h5>

        {planet.darkHairedResidents.length > 0 ? 
          <>
            <h6>Dark hair residents:</h6>
            {planet.darkHairedResidents.map(resident => <p>{resident.name}</p>)}
          </> 
        : <p style={{textAlign: "center", marginTop: "20px"}}>No dark hair residents</p>}
    </div>
  )
}

export default Planet