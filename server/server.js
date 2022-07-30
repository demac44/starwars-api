// import { config } from "dotenv"

// if (process.env.NODE_ENV !== 'production') {
//     config()
//   }


import express from 'express'
import { join, resolve } from 'path'
import cors from "cors"

import people from "./routes/api/people.js"


const app = express()

const __dirname = resolve()
app.use(express.static(join(__dirname, "client", "build")))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET","PUT","POST","DELETE","UPDATE","OPTIONS"]
}))


app.use("/api/people", people)


app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"))
})    

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started!'))
