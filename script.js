const apiKey = "56b314638acf037d7c049a3aa1b6e781";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelslike = document.getElementById("feelslike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const errorDiv = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

function showError(message) {
  errorMessage.textContent = message;
  errorDiv.classList.remove("hidden");
  weatherDisplay.classList.add("hidden");
}

if (searchBtn && cityInput) {
  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();

    if (city === "") {
      showError("Please enter a city name.");
      return;
    }

    try {
      errorDiv.classList.add("hidden");

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      cityName.textContent = `${data.name}, ${data.sys.country}`;
      temperature.textContent = Math.round(data.main.temp);
      weatherDescription.textContent = data.weather[0].description;
      feelslike.textContent = Math.round(data.main.feels_like);
      humidity.textContent = `${data.main.humidity}%`;
      windSpeed.textContent = data.wind.speed;

      weatherDisplay.classList.remove("hidden");
    } catch (error) {
      showError(error.message);
    }
  });
}
