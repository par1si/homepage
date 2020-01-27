// This doc is making a request to Optimizely Agent and return a JSON payload.


const https = require("https");
const express = require("express");
const router = express.Router();

// Formatting date
let date = new Date(Date.now()); // Today's Date
let year = date.getFullYear();
let month = ("0" + (date.getMonth() + 1)).slice(-2);
let day = ("0" + date.getDate()).slice(-2);

// Celsius to Fahrenheit

function cToF(celsius) 
{
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr;
}

// Where on Earth ID
let woeID = '2487956'; // San Francisco
let todaysDate = `${year}/${month}/${day}`;

let forecastData = '';
let displayedForecastData = '';

router.get('/', async (req, response) => {
try {

  let url = `https://www.metaweather.com/api/location/${woeID}/`;

  var options = {
    method: "GET",
    headers: {
    }
  };

  let data = "";

    let apiRequest = await https.request(url, options, function(res) {

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        forecastData = JSON.parse(data);
        displayedForecastData = Math.round(cToF(forecastData.consolidated_weather[0].the_temp));
        response.render(process.cwd() + '/views/weather-today.ejs', { forecastData : `The temperature in San Francisco today is ${displayedForecastData} degrees fahrenheit.`});
      });
    });

  apiRequest.end();
  
} catch {
    if (error) {
        console.error(error)
        }
    }
});

module.exports = router;