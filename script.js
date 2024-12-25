const apiKey = '43becddad423137f194ad07b131e7900'; // Replace with your OpenWeatherMap API key

document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const locationName = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;

    document.getElementById('location-name').textContent = locationName;
    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
    document.getElementById('conditions').textContent = `Conditions: ${conditions}`;
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    });
}