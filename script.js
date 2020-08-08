// Open Weather API Key 4471d8a288b1158a16e4a8e8f56a3e35





var cityName = "";
var zipCode = "";
var stateCode = "";
var countryCode = "";

// API Key
var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
// Building the query URL
var queryURL = "https:\\api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + zipCode + "," + stateCode + "," + countryCode + "&appid=" + apiKey;
// Automatically build a query URL based on user's location when site is loaded.
var autoQueryURL = "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}"

$('#search-button').on('click', function() {
    event.preventDefault();
    console.log("click");
    cityName = $('#search-input').val();
    console.log(cityName);
    getOpenWeather();
});

// Function to run the ajax function
function getOpenWeather() {
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        var long = response.coord.lon;
        console.log(long);
    });
}
