import express from 'express'
import movieRouter from './routes/movies.js'

const app = express()

// sets up a static file server for the web app
// use function operates as a way to mount middleware function at a specified path - for any request that starts with /public - use this middleware
// express.static = built in middleware func to serve static files (html, css, js, and images -- './public' is path to directory from whic the static assests are to be served)
// this is to serve static files from the public directory

app.use('/public', express.static('./public'))

// server files from the scripts directory
app.use('/scripts', express.static('./public/scripts'))

app.use('/movies', movieRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Best New Movies!</h1>')
})


//process.env.PORT is environment var in Node that holds port number on which a server should listen  - would be set by the hosting service (e.g. Vercel, AWS, GCP)
const PORT = process.env.PORT || 3001

//listen on port PORT and run the following function when you do
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})

