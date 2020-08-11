// Open Weather API Key 4471d8a288b1158a16e4a8e8f56a3e35
var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
// Generate Weather based on user's location when they access the page
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
// If user's location is successfully recieved
// Get the local weather based on  the user's coordinates
function success(pos) {
    var crd = pos.coords;

    // Get the user's coordinates
    var userLat = pos.coords.latitude;
    var userLon = pos.coords.longitude;

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
    // Default query request if user denies to share location

    // We stand with you Portland
    var defaultLat = 45.52;
    var defaultLon = -122.68;

    var apiKey = "4471d8a288b1158a16e4a8e8f56a3e35";
    //Automatically build a query URL based on user's location when site is loaded.
    var autoQueryURL = "https:\\api.openweathermap.org/data/2.5/weather?lat=" + defaultLat + "&lon=" + defaultLon + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: autoQueryURL,
        method: "GET",
    }).then(function (response) {
        autoRenderWeather(response);
    });
}

// Send request for user's location
navigator.geolocation.getCurrentPosition(success, error, options);

var recentSearch = [];
init();

// Get locally stored events
function init() {
    var storedSearch = JSON.parse(localStorage.getItem("recentSearch"));
    if (storedSearch !== null) {
        recentSearch = storedSearch;
    }
}

for (i = 0; i < recentSearch.length; i++) {
    var recentCity = $('<h5>').attr('class', 'border bg-light text-center p-3').text(recentSearch[i]);
    $('#search-recent').prepend(recentCity);
}

// Event listener for city search button
$('#search-button').on('click', function() {
    event.preventDefault();
    var cityName = $('#search-input').val();
    console.log(cityName);
    
    recentSearch.push(cityName);
    if (recentSearch.length > 5) {
        // recentSearch.push(cityName);
        recentSearch.shift();
    }

    $('#search-recent').empty();

    for (i = 0; i < recentSearch.length; i++) {
        var recentCity = $('<h5>').attr('class', 'border bg-light text-center p-3').text(recentSearch[i]);
        $('#search-recent').prepend(recentCity);
    }

    // var recentCity = $('<h5>').attr('class', 'border bg-light text-center p-3').text(cityName);
    // $('#search-recent').prepend(recentCity);
    localStorage.setItem("recentSearch", JSON.stringify(recentSearch));
    // console.log(recentSearch);

    // Building the query URL
    var queryURL = "https:\\api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        renderWeather(response);
    });
});

// Render the weather to the page
function renderWeather(response) {
    var cityName = $('#search-input').val();
    // Display city name, date, & weather icon
    $('#city-output').text(cityName + " (" + moment().format('M/D/YYYY) '));
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
            uvOutput.attr('style', 'background-color: green; color: white;');
        } else if (uvIndex < 6) {
            uvOutput.attr('style', 'background-color: yellow;');
        } else if (uvIndex < 8) {
            uvOutput.attr('style', 'background-color: orange;');
        } else if (uvIndex < 11) {
            uvOutput.attr('style', 'background-color: red; color: white;');
        } else {
            uvOutput.attr('style', 'background-color: purple; color: white;');
        }
    });

    // renderForecast();
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    $('#forecast').empty();
    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        var nextForecast = response.list;
        renderForecast(nextForecast);
    });
}

// Auto Render the weather
function autoRenderWeather(response) {
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
            uvOutput.attr('style', 'background-color: purple; color: white;')
        }
    });
    // renderForecast();
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function (response) {
        // console.log(response);
        var nextForecast = response.list;
        renderForecast(nextForecast);
    });
}

function renderForecast(nextForecast) {
    // $('#forecast').clear();
    
    for (let i = 0; i < 5; i++) {
        // Get date for current day iteration
        var forecastDate = moment().add((i + 1), 'days').format('M/D/YYYY');;
        // Get weather icon for current day iteration
        var nextIcon = 'http://openweathermap.org/img/w/' + nextForecast[i].weather[0].icon + '.png';
        // Get temperature  for current day iteration
        var nextTemp = nextForecast[i].main.temp;
        // Get Humidity for current day iteration
        var nextHumidtiy = nextForecast[i].main.humidity;

        // Build forcast cards
        var newCard = $('<div>').attr('id', 'card' + i).attr('class', 'card bg-primary text-white m-1').attr('style', 'width: 200px; height: 200px;');
        $('#forecast').append(newCard);

        var divBody = $('<div>').attr('class', 'card-body');
        newCard.append(divBody);

        var headTag5 = $('<h5>').attr('class', 'card-title').text(forecastDate);
        divBody.append(headTag5);

        var imageTag = $('<img>').attr('src', nextIcon);
        divBody.append(imageTag);

        var tempPTag = $('<p>').attr('class', 'card-text').text('Temp: ' + nextTemp + String.fromCharCode(176) + "F");
        divBody.append(tempPTag);
        
        var humidPTag = $('<p>').attr('class', 'card-text').text('Humid: ' + nextHumidtiy + "%");
        divBody.append(humidPTag);

    }
}