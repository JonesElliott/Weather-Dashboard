// Open Weather API Key 4471d8a288b1158a16e4a8e8f56a3e35

var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";

var cityName = "San Diego";
var zipCode = "92021";
var stateCode = "CA";
var countryCode = "US";


var queryURL = "https:\\api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + zipCode + "," + stateCode + "," + countryCode + "&appid=" + apiKey;

$('#search-button').on('click', function() {
    event.preventDefault();
    console.log("click");
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
    });
});

