const cities = ["Australia","Amazon", "Barcelona", "Cape Town", "Dubai","Abu Dhabi", "Madina", "Geneva", "Macca", "Istanbul", "Jerusalem", "", "London", "Madrid", "New York City", "Paris", "Rome", "Sydney" ,"Dhaka","Chittagong","Rajshahi","Comilla","Khulna","Islamabad", "Gana"];

function fetchWeather(city) {
    const apiKey = 'fb19a72f5fc86dce6d421593db5dfd9f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const cityWeather = document.getElementById('cityWeather');
    const cityCard = document.createElement('div');
    cityCard.classList.add('city-card');
    cityCard.innerHTML = `
        <div class="city-name">${data.name}</div>
        <div class="weather-info">
           <h5> <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            </h5>
        </div>
    `;
    cityWeather.appendChild(cityCard);
}

function handleCitySearch() {
    const searchBox = document.getElementById('searchBox');
    const searchResults = document.getElementById('searchResults');

    searchResults.innerHTML = '';

    const inputValue = searchBox.value.toLowerCase();

    const filteredCities = cities.filter(city => city.toLowerCase().includes(inputValue));

    filteredCities.sort((a, b) => {
        const startsWithInputA = a.toLowerCase().startsWith(inputValue) ? -1 : 1;
        const startsWithInputB = b.toLowerCase().startsWith(inputValue) ? -1 : 1;
        if (startsWithInputA !== startsWithInputB) {
            return startsWithInputA - startsWithInputB;
        } else {
            return a.localeCompare(b);
        }
    });

    filteredCities.forEach(city => {
        const searchItem = document.createElement('div');
        searchItem.classList.add('search-item');
        searchItem.textContent = city;
        searchItem.addEventListener('click', () => {
            fetchWeather(city);
            searchResults.innerHTML = '';
            searchBox.value = '';
        });
        searchResults.appendChild(searchItem);
    });
}

document.getElementById('searchBox').addEventListener('input', handleCitySearch);
