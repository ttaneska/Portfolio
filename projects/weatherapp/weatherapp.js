let myCity = document.getElementById("grad");
let myButton = document.getElementById("btn");
let weather1 = document.getElementById("vreme");
let cityName = document.getElementById("grad1");
let stepeni = document.getElementById("stepeni");
let weatherIcon = document.getElementById("icon");
let feelsLike = document.getElementById("feelsLike");
let humidity = document.getElementById("humidity");

// Function to clear weather information
function clearWeatherInfo() {
    cityName.textContent = "";
    stepeni.textContent = "";
    weather1.textContent = "";
    weatherIcon.src = "";
    feelsLike.textContent = "";
    humidity.textContent = "";
}

function displayWeatherInfo(data) {
    cityName.textContent = `${data.name}`;
    stepeni.textContent = `${data.main.temp.toFixed(1)}`;
    weather1.textContent = `${data.weather[0].main}`;
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    feelsLike.textContent = `Feels like: ${data.main.feels_like.toFixed(1)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
}

function showError() {
    cityName.textContent = "City Not Found";
    stepeni.textContent = "";
    weather1.textContent = "";
    weatherIcon.src = "";
    feelsLike.textContent = "";
    humidity.textContent = "";
}

myButton.addEventListener("click", function() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${myCity.value}&appid=4ef7db4bea35e971c79eccf05a83e973&units=metric`);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                displayWeatherInfo(data);
            } else {
                showError();
            }
        }
    };
});
