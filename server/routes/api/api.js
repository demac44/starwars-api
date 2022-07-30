import axios from "axios";
import express from "express";


const router = express.Router()

// CHARACTERS ROUTE

const peopleUrls = [
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

await axios.all(peopleUrls.map(url => axios.get(url)))
.then(axios.spread((...responses) => {
    for(let i=0;i<responses.length;i++){
        allCharacters = [...allCharacters, ...responses[i].data.results]
    }
}))


router.post("/people", async (req, res) => {

    const { query, limit, offset } = req.body

    let filmCharactersUrls = []
    let movieTitle = ""

    await axios.get("https://swapi.dev/api/films/?search="+encodeURI(query))
    .then((response) => {
        if(response.data.results.length > 0){
            filmCharactersUrls = response.data.results[0].characters
            movieTitle = response.data.results[0].title
        }
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


// PLANETS ROUTE

const planetsUrls = [
    "https://swapi.dev/api/planets/?page=1",
    "https://swapi.dev/api/planets/?page=2",
    "https://swapi.dev/api/planets/?page=3",
    "https://swapi.dev/api/planets/?page=4",
    "https://swapi.dev/api/planets/?page=5",
    "https://swapi.dev/api/planets/?page=6",
]

let allPlanets= []

await axios.all(planetsUrls.map(url => axios.get(url)))
.then(axios.spread((...responses) => {
    for(let i=0;i<responses.length;i++){
        allPlanets = [...allPlanets, ...responses[i].data.results]
    }
}))

router.post("/planets", (req, res) => {

    const { climate } = req.body

    let filteredData = []


    let filteredPlanets = allPlanets.filter(planet => {
        return planet.climate === climate
    })

    filteredPlanets.forEach(planet => {
        let residents = allCharacters.filter(character => {
            return planet.residents.includes(character.url)
        })

        let darkHairedResidents = residents.filter(resident => {
            return resident.hair_color === "brown" || resident.hair_color === "black"
        })

        filteredData.push({planet: planet, darkHairedResidents: darkHairedResidents})

    })

    
    res.json(filteredData)

}) 




export default router