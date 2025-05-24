async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "1165ccb090be67f80f226bc744632ec1"; // 🔁 Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    document.getElementById("weatherResult").classList.remove("hidden");
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("condition").textContent = data.weather[0].description;

    const ctx = document.getElementById("weatherChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Temperature (°C)", "Humidity (%)"],
        datasets: [{
          label: "Weather Data",
          backgroundColor: ["#60a5fa", "#34d399"],
          data: [data.main.temp, data.main.humidity]
        }]
      }
    });

  } catch (err) {
    alert("Error fetching weather data.");
    console.error(err);
  }
}
