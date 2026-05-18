// Load current weather
async function loadWeather() {
  const card = document.getElementById("weatherCard");
  card.innerHTML = "Detecting location...";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const weather = data.current_weather;

      const temp = weather.temperature;
      const wind = weather.windspeed;
      const code = weather.weathercode;

      const condition = getWeatherDescription(code);
      const icon = getWeatherIcon(code);

      card.innerHTML = `
        <div class="weather-main">
          <div class="weather-icon">${icon}</div>
          <div class="weather-temp">${temp}°F</div>
        </div>

        <div class="weather-details">
          <p>${condition}</p>
          <p>Wind: ${wind} mph</p>
        </div>
      `;
    } catch (err) {
      card.innerHTML = "Unable to load weather.";
    }
  }, () => {
    card.innerHTML = "Location permission denied.";
  });
}

// Weather icon helper
function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "⛅";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55].includes(code)) return "🌦️";
  if ([61, 63, 65].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

// Weather description helper
function getWeatherDescription(code) {
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm"
  };

  return map[code] || "Unknown weather";
}

// ⭐ 7‑Day Forecast
async function loadForecast() {
  const forecastBox = document.getElementById("forecast");
  forecastBox.innerHTML = "Detecting location...";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `
      https://api.open-meteo.com/v1/forecast
      ?latitude=${lat}
      &longitude=${lon}
      &daily=weathercode,temperature_2m_max,temperature_2m_min
      &timezone=auto
    `.replace(/\s+/g, '');

    try {
      const res = await fetch(url);
      const data = await res.json();

      const days = data.daily.time;
      const max = data.daily.temperature_2m_max;
      const min = data.daily.temperature_2m_min;
      const codes = data.daily.weathercode;

      forecastBox.innerHTML = "";

      days.forEach((day, i) => {
        const icon = getWeatherIcon(codes[i]);
        const desc = getWeatherDescription(codes[i]);

        const date = new Date(day);
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
          <div class="forecast-day">${weekday}</div>
          <div class="forecast-icon">${icon}</div>
          <div class="forecast-desc">${desc}</div>
          <div class="forecast-temp">
            <span class="high">${max[i]}°</span>
            <span class="low">${min[i]}°</span>
          </div>
        `;

        forecastBox.appendChild(card);
      });

    } catch (err) {
      forecastBox.innerHTML = "Unable to load forecast.";
    }
  });
}
