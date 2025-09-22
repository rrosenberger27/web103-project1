const renderMovies = async () => {
  console.log("running render movies")
  const res = await fetch("/movies");
  const data  = await res.json()
  const mainContent = document.getElementById("main-content");

  if (data) {
    data.map((movie) => {
      const movieCard = document.createElement("div");
      movieCard.className = "card";

      movieCard.style.backgroundImage = `url(${movie.image_link})`;

      const overlay = document.createElement("div");
      overlay.className = "card-overlay";

      const title = document.createElement("h3");
      title.className = "card-title";
      title.textContent = movie.title || "Untitled";

      const release_date = document.createElement("p")
      release_date.className = "release-date-card";
      release_date.textContent = movie.release_date || "Coming Soon"

      const seeMore = document.createElement('a');
      seeMore.className = 'card-link';
      const id = movie.id;
      seeMore.href = `/movies/${movie.id}`;
      seeMore.setAttribute('role', 'button');
      seeMore.textContent = 'See More';

      overlay.appendChild(title);
      overlay.appendChild(release_date)
      overlay.appendChild(seeMore);
      movieCard.appendChild(overlay);

      mainContent.appendChild(movieCard);
    });
  } else {
    const noMoviesHeader = document.createElement("h2");
    noMoviesHeader.textContent = "No Movies Found";
    mainContent.appendChild(noMoviesHeader);
  }
};
const requestedURL = window.location.href.split('/').pop()

if (requestedURL) {
    window.location.href = '../404.html'
} else {
    renderMovies();
}


