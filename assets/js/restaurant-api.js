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
    "&restaurant_tagcategory_standalone=10591&restaurant_tagcategory=10591&limit=30&currency=USD&open_now=true&lunit=mi&lang=en_US";

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
  var restaurantArray = data.data; //object
  console.log(restaurantArray);

  //generate categories
  var categoriesArray = [];
  for (var i = 0; i < Object.keys(restaurantArray).length; i++) {
    if (
      restaurantArray[i].cuisine != undefined &&
      Object.keys(restaurantArray[i].cuisine).length != 0
    ) {
      var categories = restaurantArray[i].cuisine[0].name;
      if (categoriesArray.includes(categories) === false) {
        categoriesArray.push(categories);
      }
    }
  }

  //category buttons
  for (var i = 0; i < categoriesArray.length; i++) {
    var categoryBtn = document.createElement("button");
    restaurantEl.appendChild(categoryBtn);
    categoryBtn.textContent = categoriesArray[i];
    categoryBtn.addEventListener("click", function (event) {
      restaurantNames(event);
    });
  }

  var restaurantNames = function (event) {
    //clear contents
    restaurantEl.innerHTML = "";
    //iterate and find matches by type
    for (var i = 0; i < Object.keys(restaurantArray).length; i++) {
      if (
        restaurantArray[i].cuisine != undefined &&
        Object.keys(restaurantArray[i].cuisine).length != 0
      ) {
        //generate elements
        if (restaurantArray[i].cuisine[0].name === event.target.textContent) {
          //container
          var restaurantContainer = document.createElement("div");
          restaurantEl.appendChild(restaurantContainer);
          restaurantContainer.setAttribute("class", "restaurant-result");
          //name
          var restaurantName = document.createElement("div");
          restaurantContainer.appendChild(restaurantName);
          restaurantName.innerHTML = restaurantArray[i].name;
          //address
          var restaurantAddress = document.createElement("div");
          restaurantContainer.appendChild(restaurantAddress);
          restaurantAddress.innerHTML = restaurantArray[i].address;
        }
      }
    }
    // **return to categories button**
    // var backBtn = document.createElement("button");
    // restaurantEl.appendChild(backBtn);
    // backBtn.textContent = "Back to categories";
    // backBtn.addEventListener("click", );
  };
};
