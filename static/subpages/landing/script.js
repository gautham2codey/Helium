function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be 12

    // Display time in 12-hour format
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

async function updateWeather(latitude, longitude) {
    const weatherElement = document.getElementById('weather');

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();

        // Convert temperature from Celsius to Fahrenheit
        const temperatureC = data.current_weather.temperature;
        const temperatureF = (temperatureC * 9/5) + 32;

        // Convert wind speed from km/h to mph
        const windSpeedKmh = data.current_weather.windspeed;
        const windSpeedMph = windSpeedKmh * 0.621371;

        weatherElement.textContent = `Current Weather: ${temperatureF.toFixed(1)}°F, Wind Speed: ${windSpeedMph.toFixed(1)} mph`;
    } catch (error) {
        weatherElement.textContent = 'Unable to fetch weather data';
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            updateWeather(latitude, longitude);
        }, () => {
            const weatherElement = document.getElementById('weather');
            weatherElement.textContent = 'Please allow location for weather info.';
        });
    } else {
        const weatherElement = document.getElementById('weather');
        weatherElement.textContent = 'Geolocation is not supported by this browser.';
    }
}

function startClock() {
    updateTime();
    getLocation(); 
    setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', startClock);

const root = document.documentElement;
if (localStorage.getItem('theme')) root.style.setProperty('--background-color', localStorage.getItem('theme'));
