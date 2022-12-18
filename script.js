/**
 * Fetch the API
 * Put the info into the var data
 */
async function getWeather() {
    const apiKey = '75e14ed0cc1e9172da2f18160c44f735';
    const city = 'London';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try
    {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } 
    catch (error) 
    {
        console.log("There are some errors with the API - Long");
        console.log(error);
    }
}  

/**
 * Update weather
 * Modify the content of the html
 * @param data the weather data fetched from the API
 */
function updateWeather(data) {
    const elementList = document.getElementsByTagName("p");
    elementList[0].innerHTML("City: ")
}

// main call
getWeather();
  

