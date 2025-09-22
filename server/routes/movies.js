import express from 'express'
// path module provides utilities towards working with file and directory paths - can manipulate file paths, normalize them, join together, and extract info
import path from 'path'

// utility function that convers a file url to a file path
import { fileURLToPath } from 'url'

import movieData from '../data/movies.js'

//import.meta.url contains the url of the current module file
const __filename = fileURLToPath(import.meta.url)
// get the name of the directory associated with the file
const __dirname = path.dirname(__filename)

const movieRouter = express.Router()

// get route that returns back all the movie information
movieRouter.get('/', (req, res) => {
    res.status(200).send(movieData).json()
})

// get route that returns back the html for a movie detail view
movieRouter.get('/:movieId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/movie.html'))
})

export default movieRouter