const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

const URL_IMG_300 = "https://image.tmdb.org/t/p/w300";
const TREND_URL = "trending/movie/week";
const GENRE_URL = "discover/movie";
const GENRES_API = "genre/movie/list";

async function getTrendingMoviesPreview() {
  const {data} = await api(TREND_URL);
  const movies = data.results;
  console.log(movies);

  createMovies(movies, trendingMoviesPreviewList);
}

async function getGenresPreview() {
  const {data} = await api(GENRES_API);
  const genres = data.genres;
  console.log(genres);

  createGenres(genres, categoriesPreviewList);
}

async function getMoviesByGenres(id) {
  const {data} = await api(GENRE_URL, {
    params: {with_genres: id}
  });
  const moviesByGenres = data.results;
  console.log(moviesByGenres);
  
  createMovies(moviesByGenres, genericSection);
}


// UTILS
function createMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach( movie => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", URL_IMG_300 + movie.poster_path);

    
    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createGenres(genres, container) {
  container.innerHTML = "";
  genres.forEach(genre => {

    const genreContainer = document.createElement("div");
    genreContainer.classList.add("category-container");

    const genreTitle = document.createElement("h3");
    genreTitle.classList.add("category-title");
    genreTitle.setAttribute("id", `id${genre.id}`);
    genreTitle.addEventListener("click", () => {
      location.hash = `#genres=${genre.id}-${genre.name}`;
    
    });

    const genreTitleText = document.createTextNode(genre.name);
    
    genreTitle.appendChild(genreTitleText);
    genreContainer.appendChild(genreTitle);
    container.appendChild(genreContainer);
    
  });
}