const weatherLocation = document.querySelector(".weather-location");
const temperatureDegree = document.querySelector(".temperature");
const temperatureType = document.querySelector(".temperature-type");
const weatherDescription = document.querySelector(".weather-description");
const temperatureBox = document.querySelector(".row2");
const weatherIcon = document.querySelector(".weather-icon");

window.addEventListener("load", () => {
  let longitude;
  let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      console.log(longitude, latitude);

      const myApiKey = "2058a918187d752c213f18c21595feea";

      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}`;
      // api 호출 시 https:// 붙이는 것 까먹지 말자!!!

      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          const { main, name, weather } = data;
          const { temp } = main;

          let celsius = Math.floor(temp - 273.15);
          // 절대 온도 K => 상대온도(°C)
          let fahrenheit = Math.floor(celsius * 1.8 + 32);
          // Set DOM Elements from the API
          weatherLocation.textContent = name;
          temperatureDegree.textContent = celsius;
          weatherDescription.textContent = weather[0].main;

          // Set Icon depending on weather
          let imgURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          weatherIcon.src = imgURL;

          // click event(change temperature unit between fahrenheit and celsius)
          temperatureBox.addEventListener("click", () => {
            if (temperatureType.textContent === "°C") {
              temperatureType.textContent = "°F";
              temperatureDegree.textContent = fahrenheit;
            } else {
              temperatureType.textContent = "°C";
              temperatureDegree.textContent = celsius;
            }
          });
        });
    });
  }
});
