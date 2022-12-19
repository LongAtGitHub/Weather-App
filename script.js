// /**
//  * Fetch the API
//  * Put the info into the var data
//  */
// async function getWeather() {
//     const apiKey = '75e14ed0cc1e9172da2f18160c44f735';
//     const city = 'London';
//     const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     try
//     {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log(data);
//     } 
//     catch (error) 
//     {
//         console.log("There are some errors with the API - Long");
//         console.log(error);
//     }
// }  

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
 * main function
 */
async function main()
{
    [lat, long] = await getLocation();
    console.log(long);
    console.log(lat);
}

main();

  
  

