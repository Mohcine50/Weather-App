const API_KEY = "292f4f15f7b8fc8633252403d2b46e87";
const API_LINK =
  "https://api.openweathermap.org/data/2.5/weather?q=london&appid=";

const weather = {
  getData: function (city) {
    document.getElementById("loading").style.visibility = "hidden";
    document.querySelector(".loading").classList.add("before");
    console.log(city);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY
    )
      .then((response) => response.json())
      .then((jsonResponse) => this.displayData(jsonResponse));
  },
  displayData: function (data) {
    const { name } = data;
    const { main, icon } = data.weather[0];
    const { pressure, humidity, temp } = data.main;
    const { speed } = data.wind;
    console.log(name, main, icon, pressure, humidity, speed);

    document.getElementById("cloud").src =
      "http://openweathermap.org/img/w/" + icon + ".png";
    document.getElementById("city").innerHTML = name;
    document.getElementById("description").innerHTML = main;
    document.getElementById("humidity").innerHTML = humidity + "%";
    document.getElementById("pressure").innerHTML = pressure + "hPa";
    document.getElementById("speed").innerHTML =
      (speed * 3.6).toFixed(2) + " km/h";
    document.getElementById("degree").innerHTML = Math.round(temp - 273.15);
    document.querySelector(".loading").classList.remove("before");
    document.getElementById("loading").style.visibility = "visible";
  },
  search: function () {
    this.getData(document.getElementById("search-bar").value);
  },
};
/* weather.getData("London"); */
document.getElementById("search").addEventListener("click", function () {
  console.log(document.getElementById("search-bar").value);
  weather.search();
});

document.getElementById("search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weather.search();
  }
});
