const movieListElem = document.querySelector('.movie-list');

async function renderMovies() { //added search here
    if(localStorage.getItem('id') === null || undefined) {
      movieListElem.innerHTML = 
      `<div class="no__result">
      <h3 class="no__result-title">No movies found!</h3>
      <img class="no__result-img" src="/assets/undraw_void_-3-ggu.svg" alt="">
      </div>`
    }
    else {
      const movies = await fetch(`http://www.omdbapi.com/?apikey=76b587ac&s=${localStorage.getItem('id')}}`); //added dynamic search here
      const moviesData = await movies.json();
      console.log(moviesData)
      movieListElem.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join('');
    }
}

function movieHTML(Movie) {
 return `      <div class="movie">
 <a href="https://www.imdb.com/title/${Movie.imdbID}/">
 <img class="movie-img"src="${Movie.Poster}"
  alt="">
 <div class="move__title">
 ${Movie.Title}
 </div>
 </a>
 </div>` 
}

function searchMovie() {
  let inputTxt = document.getElementById("input").value;
  localStorage.setItem('id',inputTxt)
  renderMovies()
}

renderMovies();
