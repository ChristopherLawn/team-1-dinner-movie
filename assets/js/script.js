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

                    displayMovie(Title, Year, Poster, imdbID)
                }
            })
        } else {
            console.log("response is not ok")
        }
    })
}

movieClickHandler = function (event) {
    var target = event.target
    console.log(target)
}

var displayMovie = function(movieTitle, movieYear, posterUrl, imdbID) {
    var movieSectionCon = document.querySelector("#movie")

    var movieContainer = document.createElement("div");
    movieContainer.setAttribute("title", movieTitle);
    movieContainer.setAttribute("imdbID", imdbID);

    var movieTitleEl = document.createElement("h3");
    movieTitleEl.textContent = movieTitle;
    movieContainer.appendChild(movieTitleEl);

    var movieYearEl = document.createElement("h4");
    movieYearEl.textContent = movieYear;
    movieContainer.appendChild(movieYearEl);

    var moviePosterEl = document.createElement("img");
    moviePosterEl.setAttribute("src", posterUrl);
    movieContainer.appendChild(moviePosterEl)

    movieSectionCon.appendChild(movieContainer);

}

var movieSectionCon = document.querySelector("#movie")
movieSectionCon.addEventListener("click", movieClickHandler);
getMovieData("Avengers")
