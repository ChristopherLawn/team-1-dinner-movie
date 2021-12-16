//RESTAURANT API CALL
var apiKey = "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a";

//containers
var restaurantEl = document.querySelector("#restaurant");

//geocoding API call
var geocodePlace = "New%20York%20City%20NY%20USA";
var geocodeApiUrl =
  "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" +
  geocodePlace +
  "&accept-language=en&polygon_threshold=0.0";

fetch(geocodeApiUrl, {
  method: "GET",
  headers: {
    "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
    "x-rapidapi-key": apiKey,
  },
}).then(function (response) {
  response.json().then(function (location) {
    getRestaurants(location);
  });
});

//use coordinates for travel advisor API
var getRestaurants = function (location) {
  var bl_latitude = location[0].boundingbox[0]; //bottom left latitude
  var tr_latitude = location[0].boundingbox[1]; //top right latitude
  var bl_longitude = location[0].boundingbox[2]; //bottom left longitude
  var tr_longitude = location[0].boundingbox[3]; //top right longitude

  var apiUrl =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary?bl_latitude=" +
    bl_latitude +
    "&tr_latitude=" +
    tr_latitude +
    "&bl_longitude=" +
    bl_longitude +
    "&tr_longitude=" +
    tr_longitude +
    "&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=false&lunit=km&lang=en_US";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  }).then(function (response) {
    response.json().then(function (data) {
      displayRestaurants(data);
    });
  });
};

//generate results in document
var displayRestaurants = function (data) {
  for (var i = 0; i < data.data.length; i++) {
    var container = document.createElement("div");
    restaurantEl.appendChild(container);
    container.innerHTML = data.data[i].name + ", " + data.data[i].address;
  }
};

//NEED TO: filter results by cuisine type
//response[i].cuisine (key value pair, need value)
