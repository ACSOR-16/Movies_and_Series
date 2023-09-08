const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

const URL_IMG_300 = "https://image.tmdb.org/t/p/w300"
const TREND_URL = "trending/movie/week";
const GENRES_API = "genre/movie/list";

async function getTrendingMoviesPreview() {
  const {data} = await api(TREND_URL);
  const movies = data.results;
  console.log(movies);

  trendingMoviesPreviewList.innerHTML = "";
  movies.forEach(movie => {

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute("src", URL_IMG_300 + movie.poster_path);

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  });
}

async function getGenresPreview() {
  const {data} = await api(GENRES_API);
  const genres = data.genres;
  console.log(genres);

  categoriesPreviewList.innerHTML = "";
  genres.forEach(genre => {

    const genreContainer = document.createElement("div");
    genreContainer.classList.add("category-container");

    const genreTitle = document.createElement("h3");
    genreTitle.classList.add("category-title");
    genreTitle.setAttribute("id", `id${genre.id}`);
    const genreTitleText = document.createTextNode(genre.name);
    
    genreTitle.appendChild(genreTitleText);
    genreContainer.appendChild(genreTitle);
    categoriesPreviewList.appendChild(genreContainer);
  });
}