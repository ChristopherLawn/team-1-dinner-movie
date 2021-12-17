// DANIEL's CODE \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

// get OMDB movie database data and movie poster
// give user a search bar to search for movie titles
// return movie poster along with synopsis and release year for EVERY result that api returns
// If user clicks on one of these titles, will call api again and get more detailed results

var movieSectionCon = document.querySelector("#movie")
var getMovieData = function (movieTitle) {
    var apiKey = "403f37df"

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

var getMovieDetails = function (imdbIDnum) {
    var apiKey = "403f37df"
    fetch(`http://www.omdbapi.com/?i=${imdbIDnum}&apikey=${apiKey}&type=movie&r=json`).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var plot = data.Plot;
                var releaseDate = data.Released;
                var actors = data.Actors;
                var rottenTomatoesReview = data.Ratings[1];
                var metacriticReview = data.Ratings[2];
                var website = data.Website;

                console.log(plot, releaseDate, actors, rottenTomatoesReview, metacriticReview, website)
            })
        } else {
            console.log("response is not ok")
        }
    })
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

var chooseMovieTitle = function() {
    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    removeChildren(movieSectionCon)

    var titleArr = ["movie", "man", "avenger", "quest", "air", "love", "crazy", "plane", "woman", "child", "teenage", "home", "speech", "king", "ghost", "easy", "west", "fun", "sorrow", "son", "daughter", "car", "space", "star", "watch", "dollar", "money", "detective", "crime", "casino", "gun", "launch", "pink", "red", "blue", "yellow"]
    
    var randNum = Math.floor(Math.random() * titleArr.length);
    console.log(randNum);
    getMovieData(titleArr[randNum])
}

movieClickHandler = function (event) {
    var target = event.target
    getMovieDetails(target.parentNode.attributes.imdbID.value)
}

movieSectionCon.addEventListener("click", movieClickHandler);
chooseMovieTitle();

// setInterval(chooseMovieTitle, 30000)

// DANIEL's CODE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^