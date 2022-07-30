import React from 'react'

const CharacterCard = ({character}) => {

    return (
    <div className='character-card'>
        <h5 className='title'>{character.name}</h5>
        <p>Birth year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>
        <p>Eye color: {character.eye_color}</p>
        <p>Hair color: {character.hair_color}</p>
        <p>Skin color: {character.skin_color}</p>
        <p>Height: {character.height}cm</p>
        <p>Mass: {character.mass}kg</p>
    </div>
  )
}

export default CharacterCard