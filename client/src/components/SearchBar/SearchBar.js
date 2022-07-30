import React, { useState } from 'react'
import "./style.css"

const SearchBar = () => {
    const searchMovies = (e) => {
        e.preventDefault()

        window.location.href = "/movies/"+e.target.movies.value
    }

    
    const searchPlanets = (e) => {
        e.preventDefault()

        window.location.href = "/planets/"+e.target.planets.value
    }

    return (
        <div className='search-container'>
            <form onSubmit={searchMovies}>
                <input 
                    name="movies"
                    id="movies"
                    type="text" 
                    placeholder='Search movies...' 
                    className='search-input'
                    />
            </form>
            <form onSubmit={searchPlanets}>
                <input 
                    name="planets"
                    id="planets"
                    type="text" 
                    placeholder='Search climates...' 
                    className='search-input'
                    />
            </form>
        </div>
    )
}

export default SearchBar