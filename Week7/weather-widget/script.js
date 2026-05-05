//search event for input
document.getElementById("search").addEventListener("click", getLocation);
//get data for users input
async function getLocation() {
  let input = document.getElementById("location").value;
  //clear old weather data for new data
  clearData();
  //defining url to turn input into lat lon
  const url = `https://nominatim.openstreetmap.org/search?q=${input}&format=jsonv2`;
  //if the request fails this is info for troubleshoot
  try {
    const response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
      console.log(`Error: Server status is: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    getWeather(json[0].lat, json[0].lon);
  } catch (error) {
    console.log(error.message);
  }
}
//uses the api to grab data for user input
async function getWeather(lat, lon) {
  console.log(`the lat and long is:${lat} + " " + ${lon}`);
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m&current=temperature_2m,weather_code&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
  console.log(url);

  try {
    //pulls data from api
    const response = await fetch(url);
    console.log(response.status);
    if (!response.ok) {
      console.log(`Error: Server status is: ${response.status}`);
    }
    const json = await response.json();
    generateCard(
      json.daily,
      json.current,
      document.getElementById("location").value,
    );
  } catch (error) {
    console.log(error.message);
  }
}
//creates a way to get rid of the date on the current time format
function timeOnly(dateTime) {
  return dateTime.split("T")[1];
}
//sends api call data to each card for each day utilizing a for loop to then build cards for each day of 7 day forecast
function generateCard(daily, current, input) {
  document.getElementById("weatherCodeNow").innerHTML = generateEmojii(
    current.weather_code,
  );
  document.getElementById("locationName").innerHTML = input;
  document.getElementById("weatherNow").innerHTML =
    `${current.temperature_2m}°F`;
  for (let i = 0; i < 7; i++) {
    document.getElementById("highlow").innerHTML +=
      `<div><h5>${daily.time[i]}</h5><h1>${generateEmojii(daily.weather_code[i])}</h1><strong>high</strong>: ${daily.temperature_2m_max[i]}°F<br/>
    <div><strong>low</strong>: ${daily.temperature_2m_min[i]}°F</div></br>
    <strong>Sunrise</strong>: ${timeOnly(daily.sunrise[i])}<br/>
    <div><strong>Sunset</strong>: ${timeOnly(daily.sunset[i])}</div>`;
  }
}
//matches weather code from the api to an emoji showing a visual of weather conditions
function generateEmojii(weatherCode) {
  switch (weatherCode) {
    case 0:
      return "☀️"; // Clear sky
    case 1:
    case 2:
    case 3:
      return "🌤️"; // Mainly clear, partly cloudy, and overcast
    case 45:
    case 48:
      return "🌫️"; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55:
      return "🌦️"; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57:
      return "🌧️"; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65:
      return "🌧️"; // Rain: Slight, moderate and heavy intensity
    case 66:
    case 67:
      return "🌨️"; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75:
      return "❄️"; // Snow fall: Slight, moderate, and heavy intensity
    case 77:
      return "🌨️"; // Snow grains
    case 80:
    case 81:
    case 82:
      return "⛈️"; // Rain showers: Slight, moderate, and violent
    case 85:
    case 86:
      return "🌨️"; // Snow showers slight and heavy
    case 95:
      return "⛈️"; // Thunderstorm: Slight or moderate
    case 96:
    case 99:
      return "🌩️"; // Thunderstorm with slight and heavy hail
    default:
      return "🌡️"; // Unknown
  }
}
//clears old results for the new results
function clearData() {
  document.getElementById("weatherCodeNow").innerHTML = "";
  document.getElementById("locationName").innerHTML = "";
  document.getElementById("weatherNow").innerHTML = "";
  document.getElementById("highlow").innerHTML = "";
}
