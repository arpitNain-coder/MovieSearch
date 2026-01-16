const API_URL = "https://www.omdbapi.com/?apikey=4264d62f";
const searched = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const movieResults = document.getElementById("movieResults");
const favorites = document.getElementById("favorites");

let favoriteMovies = JSON.parse(localStorage.getItem("favorite")) || [];

document.addEventListener("DOMContentLoaded", () => {
    displayFavourites();
})

async function fetchM(query) {
    try{
        const response = await fetch(`${API_URL}&s=${query}`);
        const data = await response.json();
        displayMovies(data.Search);
    }catch {
        console.log(`Error Occured!`);
    }

}

function displayMovies(movies) {
    movieResults.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img src="${
        movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
      }" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button onclick="addToFavorites('${movie.imdbID}', '${movie.Title.replace("'", "\\" + "'")}', '${movie.Poster}', '${movie.Year}')">Add to Favorites</button>`;
    movieResults.appendChild(movieCard);
  });
}
function addToFavorites(id, title, poster, year) {
    if(favoriteMovies.some((movie) => movie.id === id))return;
    favoriteMovies.push({id, title,poster, year});
    localStorage.setItem("favorite", JSON.stringify(favoriteMovies));
    displayFavourites();
}

function displayFavourites() {
    favorites.innerHTML = "";
  favoriteMovies.forEach((movie) => {
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("movie-card");
    favoriteCard.innerHTML = `
      <img src="${
        movie.poster !== "N/A" ? movie.poster : "placeholder.jpg"
      }" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
      <button onclick="removeFromFavorites('${movie.id}');">Remove</button>
    `;
    favorites.appendChild(favoriteCard);
  });
}

function removeFromFavorites(id) {
    favoriteMovies = favoriteMovies.filter((movie) => movie.id !== id);
    localStorage.setItem("favorite", JSON.stringify(favoriteMovies));
    displayFavourites();
}
btn.addEventListener("click", () => {
    const query = searched.value;
    if(query) {
        fetchM(query);
    }else {
        
    }
})