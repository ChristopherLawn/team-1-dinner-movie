// get OMDB movie database data and movie poster
// give user a search bar to search for movie titles
// return movie poster along with synopsis and release year for EVERY result that api returns
// If user clicks on one of these titles, will call api again and get more detailed results
var getMovieData = function (movieTitle) {
    var apiKey = ""
    
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&type=movie&r=json`).then(function (response) {
        if (response.ok) {
            response.json().then(function(data) {
                var dataArr = data.Search
                for (var i = 0; i < dataArr.length; i++) {
                    var imdbID = dataArr[i].imdbID;
                    var Title = dataArr[i].Title;
                    var Year = dataArr[i].Year;
                    var Poster = dataArr[i].Poster;
                }
            })
        } else {
            console.log("response is not ok")
        }
    })
}

getMovieData("Avengers")
