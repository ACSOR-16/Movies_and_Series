const API_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=";
const URL_IMG_300 = "https://image.tmdb.org/t/p/w300"
const GENRES_API = "https://api.themoviedb.org/3/genre/movie/list?api_key=";

async function getTrendingMoviesPreview() {
  const res = await fetch(API_URL + API_KEY);
  const data = await res.json();

  const movies = data.results;
  console.log(movies);

  movies.forEach(movie => {
    const trendingPreviewMoviesContainer = document.querySelector(".trendingPreview-movieList");

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", URL_IMG_300 + movie.poster_path);

    movieContainer.appendChild(movieImg);
    trendingPreviewMoviesContainer.appendChild(movieContainer);
  });
}

async function getGenresPreview() {
  const res = await fetch(GENRES_API + API_KEY);
  const data = await res.json();

  const genres = data.genres;
  console.log(genres);

  genres.forEach(genre => {
    const genresPreviewContainer = document.querySelector(".categoriesPreview-list");

    const genreContainer = document.createElement("div");
    genreContainer.classList.add("category-container");

    const genreTitle = document.createElement("h3");
    genreTitle.classList.add("category-title");
    genreTitle.setAttribute("id", `id${genre.id}`);
    const genreTitleText = document.createTextNode(genre.name);
    
    genreTitle.appendChild(genreTitleText);
    genreContainer.appendChild(genreTitle);
    genresPreviewContainer.appendChild(genreContainer);
  });
}

getTrendingMoviesPreview();
getGenresPreview();