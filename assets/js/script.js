// initialize dropdown menu
var dropdowns = document.querySelectorAll('.dropdown-trigger')
for (var i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], "right");
}

// document.addEventListener('DOMContentLoaded', function() {
//     var dropdown1 = document.querySelector('.simple-dropdown');
//     var dropdownOptions = {
//         'closeOnClick': true,
//         'hover':true
//     }
//     var instanceDropdown1 = M.Dropdown.init(dropdown1, dropdownOptions);
// });
