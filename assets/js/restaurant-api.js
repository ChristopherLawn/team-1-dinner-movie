//RESTAURANT API CALL
var apiKey = "c449a8d1b1mshcbe3ee310732590p115c8ejsn3b8d1f48601a";
var restaurantEl = document.querySelector("#restaurant"); //results container

//click zipcode button
var searchBtn = document.querySelector("#submit");

searchBtn.addEventListener("click", function () {
  var zipcode = document.querySelector("#zip");
  if (zipcode.value) {
    generateGeocode(zipcode.value);
  }
});

//geocoding API call
var generateGeocode = function (zipcode) {
  var geocodeApiUrl =
    "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?postalcode=" +
    zipcode +
    "&country=USA&accept-language=en&polygon_threshold=0.0";

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
};

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
      displayCategories(data);
    });
  });
};

//generate results in document
var displayCategories = function (data) {
  console.log(data);

  //generate categories
  var categoryObj = data.filters.restaurant_tagcategory;

  for (var key in categoryObj) {
    if (data.filters.restaurant_tagcategory[key].label != "All") {
      var categoryBtn = document.createElement("button");
      restaurantEl.appendChild(categoryBtn);
      categoryBtn.textContent =
        data.filters.restaurant_tagcategory[key].label;
      categoryBtn.addEventListener("click", function (event) {
        displayRestaurants(event.target.textContent);
      });
    }
  }
};

var displayRestaurants = function(style) {
  //API call with style parameter
  //replace buttons with restaurant list
  //back button?
}

