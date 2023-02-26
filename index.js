const key = "e6b3c723"
const searchBtn = document.getElementById("btn-search")
const movieList = document.getElementById("movie-list")
const searchBar = document.getElementById("search-bar")
let movieSaved = JSON.parse(localStorage.getItem("movieSaved")) || ""


searchBtn.addEventListener("click", getInitialList)

async function getInitialList() {
    let searchMovie = searchBar.value
    if (searchMovie) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchMovie}`)
        const data = await res.json()
        const finalMovieList = await getMovieList(data.Search.map(movie => movie.imdbID))
        movieList.innerHTML = finalMovieList.join("")
    }
    else {
        movieList.innerHTML = `<p class ="nothing-found">Unable to find what you are looking for.
        Please try another search</p>`
    }

}

async function getMovieList(movieIds) {
    return await Promise.all(movieIds.map(async movie => getFinalList(movie)))
     
}

function addWatchlist() {
    movieSaved +=`
    <div class = "movie-block">
        ${event.target.parentNode.parentNode.parentNode.innerHTML}
    </div>`
    localStorage.setItem("movieSaved", JSON.stringify(movieSaved))
}
        
async function getFinalList(id) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${id}`)
    const movie = await res.json()
    const movieReturn = `
    <div class = "movie-block">
        <img class = "img-movie" src = "${movie.Poster}"></img>
        <div class = "text-block">
            <div class = "movie-title">
                <h2>${movie.Title}</h2>
                <p>⭐${movie.imdbRating}</p>
            </div>
            <div class = "meta-block">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <button onclick = "addWatchlist()" class = "watchlist">➕ Watchlist</button>
            </div>
            <p class = "plot">${movie.Plot}</p>
        </div>
    </div>`
    return movieReturn
}




  