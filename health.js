async function getHealthData() {
  const country = document.getElementById("countryInput").value;
  const url = `https://disease.sh/v3/covid-19/countries/${country}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.message) {
      alert("Country not found!");
      return;
    }

    document.getElementById("healthResult").classList.remove("hidden");
    document.getElementById("countryName").textContent = data.country;
    document.getElementById("cases").textContent = data.cases.toLocaleString();
    document.getElementById("deaths").textContent = data.deaths.toLocaleString();
    document.getElementById("recovered").textContent = data.recovered.toLocaleString();

    const ctx = document.getElementById("healthChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Cases", "Deaths", "Recovered"],
        datasets: [{
          data: [data.cases, data.deaths, data.recovered],
          backgroundColor: ["#f87171", "#9ca3af", "#34d399"]
        }]
      }
    });

  } catch (err) {
    alert("Error fetching health data.");
    console.error(err);
  }
}
