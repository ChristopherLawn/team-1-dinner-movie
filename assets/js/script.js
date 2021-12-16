// get OMDB movie database data and movie poster
// give user a search bar to search for movie titles
// return movie poster along with synopsis and release year
var getMovieData = function (movieTitle) {
    var apiKey = ""
    
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&type=movie&r=json`).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
            })
        } else {
            console.log("response is not ok")
        }
    })
}

getMovieData("Avengers")
