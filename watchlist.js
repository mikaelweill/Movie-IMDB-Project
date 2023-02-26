let movieSaved = JSON.parse(localStorage.getItem("movieSaved")) || []
const movieList = document.getElementById("movie-list")

movieList.innerHTML = movieSaved

const watchlistBtns = document.getElementsByClassName("watchlist")

function removeMovie() {
    const ancestorParent = event.target.parentNode.parentNode.parentNode.parentNode
    const ancestor =  event.target.parentNode.parentNode.parentNode
    ancestorParent.removeChild(ancestor)
    localStorage.setItem("movieSaved", JSON.stringify(ancestorParent.innerHTML))
}

Object.values(watchlistBtns).forEach(btn => {
    btn.onclick = removeMovie
    btn.innerHTML = "➖ Remove"
})

            