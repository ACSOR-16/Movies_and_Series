let maxPages;
let page = 1;
let infiniteScroll;

function navigator() {

  if (infiniteScroll) {
    window.removeEventListener("scroll",infiniteScroll, {passive: false});
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#genres=")) {
    genresPages();
  } else {
    homePage();
  }
    
  document.documentElement.scrollTop = 0;
  // document.body.scrollTop = 0;
  // window.scrollTo(0, 0);

  if (infiniteScroll) {
    window.addEventListener("scroll",infiniteScroll, {passive: false});
    // infiniteScroll = undefined;
  }
}

function homePage() {
  // console.log('Home');

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.add("inactive");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove('inactive');
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getGenresPreview();
  getLikedMovies();
}

function genresPages() {
  // console.log('Genres');

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove(".header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');
  const newCategoryName = categoryName.replace("%20", " ");
  
  headerCategoryTitle.innerHTML = newCategoryName;

  getMoviesByGenres(categoryId);

  infiniteScroll = getPaginatedMoviesByGenres(categoryId);
}

function movieDetailsPage() {
  // console.log('Movie Details');

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.add("header-arrow--white");
  arrowBtn.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_ , movieId] = location.hash.split("=");
  getMovieById(movieId);
}

function searchPage() {
  // console.log('Search');

  headerSection.classList.remove("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  // console.log(query);
  const newQuery = query.replace("%20", " ");
  getSearchMoviesByValue(newQuery);

  infiniteScroll = getPaginatedMoviesByValue(newQuery);
}

function trendsPage() {
  // console.log('Trends');

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove(".header-arrow--white");
  arrowBtn.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add('inactive');
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Trends";

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}

arrowBtn.addEventListener("click", () => {
  // history.back();
  location.hash = "#home"
});
searchForm.addEventListener("click", () => {
  
  location.hash = `#search=${searchFormInput.value}`;
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);