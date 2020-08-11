# Weather-Dashboard
[Deployed Site](https://joneselliott.github.io/Weather-Dashboard/)

## About
This is a weather dashboard utilizing the [OpenWeather API](https://openweathermap.org/). Weather information is requested through ajax and dynamically displayed to the page. Through the search bar the weather for any city can be displayed along with the 5 day forecast. The 5 most recently searched cities are displayed under the search bar and can quickly be searched again by clicking on them.

## Usage

### Geolocation Request

When the site is first loaded it retrieves the coordinates of the user through the navigator and geolocation properties ```javascript navigator.geolocation.getCurrentPosition(success, error, options);```. This prompts the user for a request to access their location.

![Geo Location Prompt](./Assets.location-request.PNG)

If granted, their coordinates are retrieved and used in the ajax request to display the weather in their area. If geolocation is denied then a default city (Portland) is requested and displayed.

![Default City Weather Dashboard](./Assets.default-dashboard.PNG)

### Searching

Using the search bar any city can he requested by name. The 5 most recent searches will be displayed under the search input. These are clickable allowing the user to retreive the weather for these locations again.

![Search History List](./Assets.search-history.PNG)

### Dynamically Displayed Information

Information such as temperature, humidity, wind speed, and UV index are displayed when a city is searched. The UV index is highlighted different colors depending on the level, low, moderate, high, very high, and extreme.

![UV Low](./Assets.uv-low.PNG) ![UV Moderate](./Assets.uv-moderate.PNG) ![UV High](./Assets.uv-high.PNG) ![UV Very High](./Assets.uv-very-high.PNG) ![UV Extreme](./Assets.uv-extreme.PNG)

## Credit

### Geolocation
To understand how to retrieve and use the geolocation API I utilized Mozilla's documentation

[MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)


## License
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.