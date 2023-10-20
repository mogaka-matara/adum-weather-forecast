const apiKey = "23ee44681dee899613f147ba4ea463f2";


document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});


const weatherDataContainer = document.getElementById('weatherData');

function displayWeatherData(data) {
    // Clear previous data
    weatherDataContainer.innerHTML = '';
  
    // Display current weather
    const currentWeather = data.list[0];
    const { main, weather } = currentWeather;
    const html = `
      <div class="weather-card">
        <h2>${data.city.name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
      </div>
    `;
    weatherDataContainer.innerHTML = html;
  
    // Display 5-day forecast
    for (let i = 1; i < data.list.length; i++) {
      const forecast = data.list[i];
      const { dt_txt, main, weather } = forecast;
      const forecastHtml = `
        <div class="forecast-card">
          <p>Date and Time: ${dt_txt}</p>
          <p>${weather[0].description}</p>
          <p>Temperature: ${main.temp}°C</p>
          <p>Humidity: ${main.humidity}%</p>
        </div>
      `;
      weatherDataContainer.innerHTML += forecastHtml;
    }
  }
  
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        displayWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        weatherDataContainer.innerHTML = '<p class="error">City not found. Please try again.</p>';
      });
  });
  