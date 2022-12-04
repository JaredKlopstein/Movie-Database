const movieListElem = document.querySelector('.movie-list');
const searchResultsElem = document.querySelector('.results__title');

async function renderMovies() { //added search here
  const loadingScroll = document.querySelector('.scroll');

  loadingScroll.classList += ' scroll__loading'
    if(localStorage.getItem('id') === null || undefined) {
      movieListElem.innerHTML = 
      `<div class="no__result">
      <h3 class="no__result-title">No movies found!</h3>
      <img class="no__result-img" src="/assets/undraw_void_-3-ggu.svg" alt="">
      </div>`
      setTimeout(function(){
        loadingScroll.classList.remove('scroll__loading')
    }, 1000);
      
    }
    else {
      const movies = await fetch(`http://www.omdbapi.com/?apikey=76b587ac&s=${localStorage.getItem('id')}`); //added dynamic search here
      const moviesData = await movies.json();
      console.log(moviesData)
      movieListElem.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join('');
      searchResultsElem.innerHTML = `Search Results for: ${localStorage.getItem('id')}`
      setTimeout(function(){
        loadingScroll.classList.remove('scroll__loading')
    }, 1000);
    }
    

}

function movieHTML(Movie) {
 return `      <div class="movie">
 <a href="https://www.imdb.com/title/${Movie.imdbID}/">
 <img class="movie-img"src="${Movie.Poster}"
  alt="">
 <div class="movie__title">
 ${Movie.Title}
 </div>
 <div class="movie__play">
 <i class="fas fa-circle-play"></i>
 </div>
 </a>
 </div>` 
}

function searchMovie() {
  let inputTxt = document.getElementById("input").value;
  localStorage.setItem('id',inputTxt);
  renderMovies();
}

renderMovies();
