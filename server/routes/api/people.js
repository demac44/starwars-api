import axios from "axios";
import express from "express";


const router = express.Router()


router.post("/", async (req, res) => {

    let allCharacters = []
    let filmCharactersUrls = []
    let movieTitle = ""
    const { query, limit, offset } = req.body


    for(let i = 1;i<10;i++){
        await axios.get("https://swapi.dev/api/people/?page="+i)
        .then(response => {
            allCharacters = [...allCharacters, ...response.data.results]
        })
    }

    await axios.get("https://swapi.dev/api/films/?search="+query)
    .then((response) => {
        filmCharactersUrls = response.data.results[0].characters
        movieTitle = response.data.results[0].title
    })

    const filmCharacters = allCharacters.filter(character => {
        return filmCharactersUrls.includes(character.url)
    })

    let totalResultsNo = filmCharacters.length

    res.json({
        title: movieTitle, 
        characters: filmCharacters.slice(offset, limit),
        total: totalResultsNo,
        showLoadMore: limit >= totalResultsNo ? false : true
    })


}) 



export default router