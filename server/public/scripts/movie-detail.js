const renderMovie = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop());
    const res = await fetch('/movies');
    const data = await res.json();


    const movieContent = document.getElementById('movie-content');

    let movie;

    if (data) {
        movie = data.find(movie => movie.id === requestedID);

        if (movie) {
            const img = document.getElementById('image');
            img.src = movie.image_link
            
            const title = document.getElementById('title');
            title.textContent = movie.title;

            const releaseDate = document.getElementById('release-date');
            releaseDate.textContent = movie.release_date;

            const description = document.getElementById('description');
            description.textContent = movie.description;

            const trailer_link = document.getElementById('trailer-link');
            console.log(movie.trailer_link)
            trailer_link.href = movie.trailer_link;
            console.log(trailer_link.href)

        } else {
            const message = document.createElement('h2');
            message.textContent = 'No movies available';
            movieContent.appendChild(message);
        }
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No movies available';
        movieContent.appendChild(message);
    }
}

const path = window.location.pathname;
const movieDetailRegex = /^\/movies\/([1-7])$/;
const match = path.match(movieDetailRegex);

if (match) {
  renderMovie();
} else {
  window.location.href = '/404.html';
}