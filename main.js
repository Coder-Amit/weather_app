setInterval(() => {
  var d = new Date();
  let dateTime = document.querySelector(".date-time");
  let date = d.toDateString();
  let time = d.toTimeString().slice(0, 9);
  dateTime.innerHTML = date + " | " + time;
}, 1000);

(function getLocation() {
  navigator.geolocation.getCurrentPosition(getValueByLocation, error);
})();

function error(err) {
  alert(`ERROR(${err.code}): ${err.message}`);
}
async function getValueByLocation(pos) {
  let cord = pos.coords;
  let API_ID = "your_API_ID";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${cord.latitude}&lon=${cord.longitude}&appid=${API_ID}&units=metric`;
  try {
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
    putValue(data);
  } catch (error) {
    alert("Someting Went Wrong!!");
  }
}
function putValue(obj) {
  const locationName = document.querySelector(".city-name");
  const overallConditon = document.querySelector(".overall-cond");
  const icon = document.querySelector(".icon");
  const temp = document.querySelector(".temprature-data-value");
  const tempFeel = document.querySelector(".temprature-data-feel");
  const humidity = document.querySelector(".humidity-value");
  const windSpeed = document.querySelector(".wind-speed-value");
  const visibility = document.querySelector(".visibility-value");
  const sunrise = document.querySelector(".sunrise-value");
  const sunset = document.querySelector(".sunset-value");
  const direction = document.querySelector(".wind-direction-value");
  locationName.innerHTML = obj.name + "," + obj.sys.country;
  icon.src = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
  icon.alt = obj.weather[0].description;
  overallConditon.innerHTML = obj.weather[0].main;
  temp.innerHTML = obj.main.temp + " &#8451;";
  tempFeel.innerHTML = obj.main.feels_like;
  humidity.innerHTML = obj.main.humidity;
  windSpeed.innerHTML = obj.wind.speed;
  visibility.innerHTML = obj.visibility / 1000;
  datObj(obj.sys.sunrise, sunrise);
  datObj(obj.sys.sunset, sunset);
  directionObj(obj.wind.deg, direction);
}
const datObj = (utc, tm) => {
  let temp = new Date(utc * 1000);
  let time = temp.toTimeString();
  tm.innerHTML = time.slice(0, 9);
};
const directionObj = (deg, tm) => {
  let direction;
  if (deg > 349 && deg <= 11) {
    direction = "N";
  }
  if (deg > 79 && deg <= 101) {
    direction = "E";
  }
  if (deg > 169 && deg <= 191) {
    direction = "S";
  }
  if (deg > 259 && deg <= 281) {
    direction = "W";
  }
  if (deg > 281 && deg <= 350) {
    direction = "NW";
  }
  if (deg > 191 && deg <= 259) {
    direction = "SW";
  }
  if (deg > 101 && deg <= 169) {
    direction = "SE";
  }
  if (deg > 11 && deg <= 79) {
    direction = "NE";
  }
  tm.innerHTML = direction;
};

async function getInput() {
  let cityName = document.querySelector("#city").value;
  let API_ID = "your_API_ID";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_ID}&units=metric`;
  try {
    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
    putValue(data);
  } catch (error) {
    alert("Someting Went Wrong!!");
  }
}

const button = document.querySelector(".btn");
button.addEventListener("click", getInput);
