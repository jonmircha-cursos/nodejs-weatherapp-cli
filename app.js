import axios from "axios";
import chalk from "chalk";

const API_KEY = "ac304055463b929a21ff8d8088058fd1";

function displayWeather(city, weatherData) {
  const { weather, main } = weatherData;

  console.log(chalk.yellow(`\nInformación del clima ${city}:`));
  console.log(
    chalk.yellow(
      "☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️"
    )
  );
  console.log(chalk.cyan("Descripción:"), weather[0].description);
  console.log(chalk.cyan("Temperatura:"), `${main.temp} °C`);
  console.log(chalk.cyan("Humedad:"), `${main.humidity}%`);
  console.log(
    chalk.cyan("Velocidad del Viento:"),
    `${weatherData.wind.speed} m/s`
  );
  console.log(
    chalk.yellow("☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️☀️🌙❄️🌡️💧🌈🌪️🌧️\n")
  );
}

function handleError(error) {
  console.log(chalk.red("Error: "), error.message);
  process.exit(1);
}

async function getWeather(city){
  try {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather`;

    const response = await axios.get(endpoint, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      }
    });
    return response.data;
  } catch (error) {
    console.log(chalk.red(error));
    throw new Error(`No es posible obtener la información de la ciudad: ${city}`)
  }
}

async function initApp(){
  let [, , city] = process.argv;
  
  if (!city) {
    console.log(chalk.red("Por favor, proporciona un nombre de lugar o ciudad"));
    console.log(chalk.red("Ejecuta el siguiente comando: node start [nombre ciudad]"));
  }

  try {
    const weatherData = await getWeather(city);

    displayWeather(city, weatherData)
  } catch (error) {
    handleError(error);
  }

}

initApp();