// calling main
main();

/**
 * main function
 */
async function main() {
  // Get the json object and Set up
  let unit = localStorage.getItem("unit");
  if (!unit) {
    unit = "metric";
  }
  console.log(unit);
  const [lat, long] = await getLocation();
  const weatherData = await getWeather(lat, long, unit);
  console.log(weatherData);
  const addressData = await getExactAddress(lat, long);
  const conciseAddr = getConciseAddr(addressData);
  const airData = await getAirQuality(lat, long);
  console.log(airData);
  const airQualityMap = new Map();
  airQualityMap.set(1, "Good");
  airQualityMap.set(2, "Fair");
  airQualityMap.set(3, "Moderate");
  airQualityMap.set(4, "Poor");
  airQualityMap.set(5, "Very Poor");
  
  // Change the html text display
  document.getElementById("location").innerHTML = conciseAddr;
  document.getElementById("description").innerHTML = weatherData.weather[0].description;
  const iconLink = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  document.getElementById("imgIcon").src = iconLink;
  document.getElementById("temp").innerHTML = getConciseNumber( weatherData.main.temp)+ "\u00B0C";
  document.getElementById("feels").innerHTML +=  getConciseNumber(weatherData.main.feels_like)+ "\u00B0C";
  document.getElementById("windSpeed").innerHTML += weatherData.wind.speed + " m/s";
  document.getElementById("humidity").innerHTML += weatherData.main.humidity + "%";
  document.getElementById("visibility").innerHTML += weatherData.visibility + " m";
  document.getElementById("air").innerHTML += airQualityMap.get(airData.list[0].main.aqi);
}

/**
 * @returns latitude and longitude in the form of tuple
 */
async function getLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return [position.coords.latitude, position.coords.longitude];
  } catch (error) {
    console.log(error);
  }
  return [21.0278, 105.8342]; // Coordinates of Hanoi
}

/**
 * Get the general info of a place given the lat and long using await
 * @param lat latitude of the location
 * @param long longitude of the location
 * @param units metrics or imperial, if left unfilled it would be metric
 * @param return the data json object containing info
 */
async function getWeather(lat, lon, unit) {
  const apiKey = "75e14ed0cc1e9172da2f18160c44f735";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  catch (error) {
    console.log("OpenWeather API fails");
    console.log(error);
    return null;
  }
}

/**
 * This function outputs the visually appealing address
 * @param lat 
 * @param lon 
 */
async function getExactAddress(lat, lon) {
  const apiKey = "b46097a613ab4e0189b194232e2de159";
  apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log("Geoapify API fails");
    console.log(error);
    return null;
  }
}

async function getAirQuality(lat, lon) {
  const apiKey = "75e14ed0cc1e9172da2f18160c44f735";
  const apiUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const airData = await response.json();
    return airData;
  }
  catch (error) {
    console.log("OpenWeather Air Quality API fails");
    console.log(error);
    return null;
  }
}

/**
 * 
 * @returns the concise address
 */
function getConciseAddr(jsonObj) {
  data = jsonObj.results[0];
    if (data.country_code == "us") {
      ret = data.city + ", " + data.state_code;
    }
    else {
      ret = data.city + ", " + data.country;
    }
    return ret;
}

/**
 * @param number
 * @returns number rounded to 1 decimal places
 */
function getConciseNumber(num) {
  return Math.round(num * 10) / 10;
}
/**
 * Change the measurement to 'C' or 'F' (metrics vs imperial)
 * @param {*} sys: 'C' or 'F' 
 */
function changeSystem(unit) {
  localStorage.setItem("unit", unit);
  location.reload();
}








