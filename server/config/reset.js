import { pool } from "./database.js";
import './dotenv.js';
import movieData from "../data/movies.js";

const createMovieTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS movies;

    CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image_link VARCHAR(500) NOT NULL,
        trailer_link VARCHAR(500) NOT NULL,
        release_date VARCHAR(500) NOT NULL
    )
    `
    try {
        const res = await pool.query(createTableQuery);
        console.log("movies table created successfuly 😫");
    } catch (err) {
        console.error('error creating movies table', err)
    }
}

const seedMoviesTable = async () => {
    await createMovieTable();
    movieData.forEach((movie) => {
        const insertQuery = 'INSERT INTO movies (title, description, image_link, trailer_link, release_date) VALUES ($1, $2, $3, $4, $5)'

        const values = [
            movie.title,
            movie.description,
            movie.image_link,
            movie.trailer_link,
            movie.release_date
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('error inserting movie', err);
                return;
            }
            console.log(`✅ ${movie.title} added successfully`)
        })
    })
}

seedMoviesTable();