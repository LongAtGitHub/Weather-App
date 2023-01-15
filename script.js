// calling main
main();

/**
 * main function
 */
async function main()
{
    const [lat, long] = await getLocation(); 
    const weatherData = await getWeather(lat, long);

    // addressData json cleaning
    const addressData = await getExactAddress(lat, long);
    const conciseAddr = getConciseAddr(addressData.results[0].country, addressData.results[0].state, addressData.results[0].city);
    document.getElementById("location").innerHTML = conciseAddr;
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
    return [null, null];
  }

/**
 * Get the general info of a place given the lat and long using await
 * @param lat latitude of the location
 * @param long longitude of the location
 * @param units metrics or imperial, if left unfilled it would be metric
 * @param return the data json object containing info
 */
async function getWeather(lat, lon, units = "metric") {
    const apiKey = "75e14ed0cc1e9172da2f18160c44f735";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  
        console.log(data)      
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
    console.log(data)      
    return data;
  }
  catch (error) {
    console.log("OpenWeather API fails");
    console.log(error);
    return null;
  }
}

/**
 * 
 * @param {*} country 
 * @param {*} state 
 * @param {*} city 
 * @returns the concise address
 */
function getConciseAddr(country, state, city) {
  country = country || '';
  state = state || '';
  city = city || '';
  conciseOutput = `${city}, ${state} - ${country}`;
  return conciseOutput;
}

  



  
  

