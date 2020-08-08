// Open Weather API Key 4471d8a288b1158a16e4a8e8f56a3e35

// Automatically build a query URL based on user's location when site is loaded.
// var autoQueryURL = "api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}"

$('#search-button').on('click', function() {
    event.preventDefault();
    var cityName = $('#search-input').val();
    console.log(cityName);

    var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
    // Building the query URL
    var queryURL = "https:\\api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        // Display city name, date, & weather icon
        $('#city-output').text(cityName + " (" + moment().format('M/D/YYYY) '));
        $('#wicon').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');

        console.log(response.main.temp);
        // Display the current temperature
        $('#temp-output').text('Temperature: ' + response.main.temp + String.fromCharCode(176) + "F");
        // Display current humidity
        $('#humidity-output').text('Humidity: ' + response.main.humidity + '%');
        // Display current windspeed
        $('#wind-output').text('Wind Speed: ' + response.wind.speed + ' MPH');

        // Get the lat & lon values
        var cityLat  = response.coord.lat;
        var cityLon  = response.coord.lon;

        // Building query URL to retrieve UV Index based on city searched
        var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLat + "&lon=" + cityLon;

        $.ajax({
            url: queryUVURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            var uvIndex = response.value;
            var uvOutput = $('#uv-output')
            uvOutput.text(uvIndex);
            // Change background color based on UV Index
            if (uvIndex < 3) {
                uvOutput.attr('style', 'background-color: green;')
            } else if (uvIndex < 6) {
                uvOutput.attr('style', 'background-color: yellow;')
            } else if (uvIndex < 8) {
                uvOutput.attr('style', 'background-color: orange;')
            } else if (uvIndex < 11) {
                uvOutput.attr('style', 'background-color: red;')
            } else {
                uvOutput.attr('style', 'background-color: purple;')
            }
        });
    });
});

