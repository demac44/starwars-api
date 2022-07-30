import React, { useCallback, useEffect, useState } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import CharacterCard from './CharacterCard'
import "./style.css"
import logo from "../../assets/images/logo.png"
import RocketLoader from '../Loaders/RocketLoader'
import FetchingLoader from '../Loaders/FetchingLoader'
import SearchBar from "../SearchBar/SearchBar"
import FiltersBar from './FiltersBar'

const fetchData = async (query, limit) => {
  return await axios({
    method: "POST",
    url: "/api/people",
  data: {
    query: query,
    limit: limit,

  },
  withCredentials: true
}).then(res => {
    return {
      characters: res.data.characters,
      title: res.data.title,
      showLoadMore: res.data.showLoadMore
    }
  })
}

const fetchMore = async (query, limit, offset) => {
  return await axios({
    method: "POST",
    url: "/api/people",
  data: {
    query: query,
    limit: limit,
    offset: offset
  },
  withCredentials: true
}).then(res => {
    return {
      characters: res.data.characters,
      showLoadMore: res.data.showLoadMore
    }
  })
}

let originalArray = []
let movieTitle = ""

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const { query } = useParams()
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(30)
  const [showLoadMore, setShowLoadMore] = useState(false)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(query){
      fetchData(query, limit)
      .then(res => {
        originalArray = [...res.characters]
        setCharacters(res.characters)
        movieTitle = res.title
        setShowLoadMore(res.showLoadMore)
      })
      .then(() => setLoading(false))
    }
  }, [query])


  const filterResults = (gender) => {
    if(gender === "all"){
      setCharacters(originalArray)
    } else {
      setCharacters(originalArray.filter(character => {
        return character.gender === gender
      }))
    }
  }

  const sortResults = (value, order) => {
    // godina rođenja dolazi u formatu stringa npr.19BBY ili 19ABY
    // BBY - before battle of yavin
    // ABY - after battel of yavin

    console.log(value, order);

    if(value === "age"){

      // odvajanje BBY i ABY
      let BBY = characters.filter(character => {
        return character.birth_year.slice(-3) === "BBY"
      })

      let ABY = characters.filter(character => {
        return character.birth_year.slice(-3) === "ABY"
      })

      BBY = BBY.sort((a, b) => {
        // odvajanje godine rođenja i parsiranje stringa u broj
        a = parseInt(a.birth_year.slice(0, a.birth_year.indexOf("BBY")))
        b = parseInt(b.birth_year.slice(0, b.birth_year.indexOf("BBY")))
        if ( a < b ){
          return order === "asc" ? -1 : 1;
        }
        if ( a > b ){
          return order === "asc" ? 1 : -1;
        }
        return 0;
      })

      ABY = ABY.sort((a, b) => {
        a = parseInt(a.birth_year.slice(0, a.birth_year.indexOf("ABY")))
        b = parseInt(b.birth_year.slice(0, b.birth_year.indexOf("ABY")))
        if ( a < b ){
          return order === "asc" ? -1 : 1;
        }
        if ( a > b ){
          return order === "asc" ? 1 : -1;
        }
        return 0;
      })

      if(order === "asc") setCharacters(ABY.concat(BBY))
      else if(order === "desc") setCharacters(BBY.concat(ABY))

    } else if(value === "height"){
        setCharacters([...characters.sort((a, b) => {
          if ( parseInt(a.height) < parseInt(b.height) ){
            return order === "asc" ? -1 : 1;
          }
          if ( parseInt(a.height) > parseInt(b.height) ){
            return order === "asc" ? 1 : -1;
          }
          return 0;
      })])
    }
  }


  return (
    <>
      {loading ? <RocketLoader/> : <div className='characters-container'>
        <img className='logo' src={logo} alt=""/>

        <SearchBar/>
        
        <h1 className='movie-title'>Movie: {movieTitle}</h1>

        <FiltersBar sortResults={sortResults} filterResults={filterResults}/>

        <div className='characters-grid'>
          {characters.map(character => <CharacterCard character={character} key={character.name}/>)}
        </div>

        {fetching && <FetchingLoader/>}

        {(showLoadMore && !fetching) && <button className='load-more-btn' onClick={() => {
          setFetching(true)
          fetchMore(query, limit+30, limit).then(res => {
            setCharacters([...characters, ...res.characters])
            setShowLoadMore(res.showLoadMore)
            setLimit(limit+30)
          })
          .then(() => setFetching(false))
        }}>LOAD MORE</button>}
      </div>}
    </>
  )
}

export default Characters


