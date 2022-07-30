import axios from "axios";
import express from "express";


const router = express.Router()

const urls = [
    "https://swapi.dev/api/people/?page=1",
    "https://swapi.dev/api/people/?page=2",
    "https://swapi.dev/api/people/?page=3",
    "https://swapi.dev/api/people/?page=4",
    "https://swapi.dev/api/people/?page=5",
    "https://swapi.dev/api/people/?page=6",
    "https://swapi.dev/api/people/?page=7",
    "https://swapi.dev/api/people/?page=8",
    "https://swapi.dev/api/people/?page=9",
]

let allCharacters = []
let filmCharactersUrls = []
let movieTitle = ""

router.post("/", async (req, res) => {

    const { query, limit, offset } = req.body


    await axios.all(urls.map(url => axios.get(url)))
    .then(axios.spread((...responses) => {
        for(let i=0;i<responses.length;i++){
            allCharacters = [...allCharacters, ...responses[i].data.results]
        }
    }))

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