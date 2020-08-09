// Open Weather API Key 4471d8a288b1158a16e4a8e8f56a3e35
var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
// Generate Weather based on user's location when they access the page
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
// If user's location is successfully recieved
function success(pos) {
    var crd = pos.coords;

    // Get the user's coordinates
    var userLat = pos.coords.latitude;
    var userLon = pos.coords.longitude;

    // Get the local weather based on  the user's coordinates
    var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
    //Automatically build a query URL based on user's location when site is loaded.
    var autoQueryURL = "https:\\api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLon + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: autoQueryURL,
        method: "GET",
    }).then(function (response) {
        autoRenderWeather(response);
    });
}

// Console log error if userlocation doesnt work
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// Send request for user's location
navigator.geolocation.getCurrentPosition(success, error, options);

// Event listener for city search button
$('#search-button').on('click', function() {
    event.preventDefault();
    var cityName = $('#search-input').val();
    console.log(cityName);

    // Building the query URL
    var queryURL = "https:\\api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        renderWeather(response);
    });
});

// Render the weather to the page
function renderWeather(response) {
    var cityName = $('#search-input').val();
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
            uvOutput.attr('style', 'background-color: green;');
        } else if (uvIndex < 6) {
            uvOutput.attr('style', 'background-color: yellow;');
        } else if (uvIndex < 8) {
            uvOutput.attr('style', 'background-color: orange;');
        } else if (uvIndex < 11) {
            uvOutput.attr('style', 'background-color: red;');
        } else {
            uvOutput.attr('style', 'background-color: purple;');
        }
    });

    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        var nextForecast = response.list[0];
        console.log(nextForecast);
        renderForecast(nextForecast);
    });
}

// Auto Render the weather
function autoRenderWeather(response) {
    console.log(response);
    var userCity = response.name;
    $('input').attr('placeholder', userCity);
    // Display city name, date, & weather icon
    $('#city-output').text(userCity + " (" + moment().format('M/D/YYYY) '));
    $('#wicon').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');

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
    // renderForecast();
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        var nextForecast = response.list[0];
        console.log(nextForecast);
        renderForecast(nextForecast);
    });
}

function renderForecast(nextForecast) {
    console.log(nextForecast);
    var nextIcon = 'http://openweathermap.org/img/w/' + nextForecast.weather[0].icon + '.png';
    for (let i = 0; i < 5; i++) {
        var newCard = $('<div>').attr('id', 'card' + i).attr('class', 'card').attr('style', 'width: 200px; height: 200px;');
        $('#forecast').append(newCard);

        var divBody = $('<div>').attr('class', 'card-body');
        newCard.append(divBody);

        var headTag5 = $('<h5>').attr('class', 'card-title').text();
        divBody.append(headTag5);

        var headTag6 = $('<img>').attr('src', nextIcon);
        divBody.append(headTag6);

        var tempPTag = $('<p>').attr('class', 'card-text').text('Temp: ' + String.fromCharCode(176) + "F");
        divBody.append(tempPTag);
        
        var humidPTag = $('<p>').attr('class', 'card-text').text('Humid: ' + "%");
        divBody.append(humidPTag);

    }
}