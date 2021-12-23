// !important Zac's code
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems);
  });
  

// initialize dropdown menu
var dropdowns = document.querySelectorAll('.dropdown-trigger')
for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i]);
}

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

// document.addEventListener('DOMContentLoaded', function() {
//     var dropdown1 = document.querySelector('.simple-dropdown');
//     var dropdownOptions = {
//         'closeOnClick': true,
//         'hover':true
//     }
//     var instanceDropdown1 = M.Dropdown.init(dropdown1, dropdownOptions);
// });


