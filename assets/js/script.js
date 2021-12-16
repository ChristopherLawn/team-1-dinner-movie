//containers
var restaurantEl = document.querySelector("#restaurant");

//results include location_string and a location_id; filter further?
var bl_latitude = "11.847676"; //bottom left latitude
var tr_latitude = "12.838442"; //top right latitude
var bl_longitude = "109.095887"; //bottom left longitude
var tr_longitude = "109.149359"; //top right longitude

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
    "x-rapidapi-key": "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a",
  },
}).then(function (response) {
  response.json().then(function (data) {
    console.log(data);
    displayRestaurants(data);
  });
});

var displayRestaurants = function (data) {
  for (var i = 0; i < data.data.length; i++) {
    var container = document.createElement("div")
    restaurantEl.appendChild(container);
    container.innerHTML = data.data[i].name + ", " + data.data[i].address
  }
};
//filter results by cuisine type
//response[i].cuisine (key value pair, need value)








