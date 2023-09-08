window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false);

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movies=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#genres=")) {
    genresPages();
  } else {
    homePage();
  }
    
}

function homePage() {
  console.log('Home');

  getTrendingMoviesPreview();
  getGenresPreview();
}

function genresPages() {
  console.log('Genres');
}

function movieDetailsPage() {
  console.log('Movie Details');
}

function searchPage() {
  console.log('Search');
}

function trendsPage() {
  console.log('Trends');
}