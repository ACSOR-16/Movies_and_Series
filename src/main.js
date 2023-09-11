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
const URL_IMG_500 = "https://image.tmdb.org/t/p/w500";

const TREND_URL = "trending/movie/week";
const VIDEO_URL = "movie/";
const GENRE_URL = "discover/movie";
const GENRES_API = "genre/movie/list";
const SEARCH_API = "search/movie";

async function getTrendingMoviesPreview() {
  const {data} = await api(TREND_URL);
  const movies = data.results;
  // console.log(movies);

  createMovies(movies, trendingMoviesPreviewList, true);
}

async function getTrendingMovies() {
  const {data} = await api(TREND_URL);
  const movies = data.results;
  // console.log(movies);

  createMovies(movies, genericSection);
}


async function getGenresPreview() {
  const {data} = await api(GENRES_API);
  const genres = data.genres;
  // console.log(genres);

  createGenres(genres, categoriesPreviewList);
}

async function getMoviesByGenres(id) {
  const {data} = await api(GENRE_URL, {
    params: {with_genres: id}
  });
  const moviesByGenres = data.results;
  // console.log(moviesByGenres);
  
  createMovies(moviesByGenres, genericSection);
}

async function getSearchMoviesByValue (query) {
  const {data} = await api(SEARCH_API, {
    params: {query}
  });
  const moviesByQuery = data.results;
  // console.log(moviesByQuery);
  
  createMovies(moviesByQuery, genericSection);
}

async function getMovieById(id) {
  const {data: movie} = await api(VIDEO_URL + id);
  
  const movieImgBackground = `${URL_IMG_500}${movie.poster_path}`;
  headerSection.style.background = `
  linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgBackground})`
  // console.log(movie);
  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createGenres(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const {data} = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}
// UTILS
const lazyLoader = new IntersectionObserver( (entries) => {
  entries.forEach( (entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url)
  
    }
  });
});

function createMovies(movies, container, lazyLoad = false) {
  container.innerHTML = "";

  movies.forEach( movie => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src", 
      URL_IMG_300 + movie.poster_path
      );

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
    
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