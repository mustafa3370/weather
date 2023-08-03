// ============== get elements
var searchFor = document.getElementById("searchFor");
var btnSearch = document.getElementById("btnSearch");
var forecastContaciner = document.getElementById("forecastContaciner");
// ============== global
var forecastContainer = [];
var weekDays = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday",
];
var months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

// ============== when start
(function () {
   allData();
})();
// ============== events
searchFor.addEventListener("input", allData);
btnSearch.addEventListener("click", allData);
// ============== functions
async function allData() {
   await getData();
   displayData();
}
// get day name
var getWeekDay = (date) => new Date(date);
// get data
async function getData() {
   try {
      var searchValue = searchFor.value ? searchFor.value : "cairo";
      var weatherData = await (
         await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=a9170d9dc74f459a91b71945230308&q=${searchValue}07112&days=3`
         )
      ).json();
      forecastContainer = weatherData;
   } catch (error) {
      onerror = true;
   }
}
// display data
async function displayData() {
   try {
      var forecastDay = forecastContainer.forecast.forecastday;
      var curentNameDay = weekDays[getWeekDay(forecastDay[0].date).getDay()];
      var curentDayMonth = months[getWeekDay(forecastDay[0].date).getMonth()];
      var curentMonthNum = new Date().getDate();
      var nextNameDay = weekDays[getWeekDay(forecastDay[1].date).getDay()];
      var latestNameDay = weekDays[getWeekDay(forecastDay[2].date).getDay()];
      forecastContaciner.innerHTML = `
   <div class="col">
   <div class="forecast-curent card  h-100">
      <div class="card-header hstack justify-content-between">
         <h4
            class="mb-0 h6 text-white text-opacity-50"
         >
            ${curentNameDay}
         </h4>
         <h5
            class="curent-date mb-0 small text-white text-opacity-50 fw-light"
         >
            ${curentMonthNum}${curentDayMonth}
         </h5>
      </div>
      <div class="card-body">
         <h4
            class="forecast-location pt-2 small text-white text-opacity-50"
         >
         ${forecastContainer.location.name}
         </h4>
         <div
            class="forecast-deg hstack flex-wrap justify-content-between text-white text-opacity-50"
         >
            <h2 class="text-white deg">${forecastContainer.current.temp_c}<sup>o</sup>C</h2>
            <img src="${forecastContainer.current.condition.icon}" alt="" />
         </div>
         <span
            class="forecast-custom color__secondary fw-light"
            >${forecastContainer.current.condition.text}</span
         >
         <div
            class="forecast-data text-white small hstack gap-4 mt-4"
         >
            <span>
               <img
                  class="img-fluid"
                  src="./img/icon-umberella.png"
                  alt="icon images"
               />
               ${forecastContainer.current.cloud}%
            </span>
            <span>
               <img
                  class="img-fluid"
                  src="./img/icon-wind.png"
                  alt="icon images"
               />
              ${forecastContainer.current.wind_kph}km/h
            </span>
            <span>
               <img
                  class="img-fluid"
                  src="./img/icon-compass.png"
                  alt="icon images"
               />
               ${forecastContainer.current.wind_dir}
            </span>
         </div>
      </div>
   </div>
</div>
<div class="col">
   <div
      class="forecast-curent card  h-100 text-center"
   >
      <div class="card-header">
         <h4
            class=" mb-0 h6 text-white text-opacity-50"
         >
         ${nextNameDay}
         </h4>
      </div>
      <div class="card-body py-5">
         <img
            src="${forecastContainer.forecast.forecastday[1].day.condition.icon}"
            alt="photo weather"
         />
         <div class="forecast-deg text-white">
            <h2 class="mt-3">${forecastContainer.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h2>
            <h6
               class="text-white text-opacity-50 mb-4 fw-light"
            >
            ${forecastContainer.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C
            </h6>
            <span
               class="forecast-custom color__secondary fw-light"
               > ${forecastContainer.forecast.forecastday[1].day.condition.text}
            </span>
         </div>
      </div>
   </div>
</div>
<div class="col">
   <div
      class="forecast-curent card  h-100 text-center"
   >
      <div class="card-header">
         <h4
            class=" mb-0 h6 text-white text-opacity-50"
         >
         ${latestNameDay}
         </h4>
      </div>
      <div class="card-body py-5">
         <img
            src="${forecastContainer.forecast.forecastday[2].day.condition.icon}"
            alt="photo weather"
         />
         <div class="forecast-deg text-white">
            <h2 class="mt-3">${forecastContainer.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h2>
            <h6
               class="text-white text-opacity-50 mb-4 fw-light"
            >
            ${forecastContainer.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C
            </h6>
            <span
               class="forecast-custom color__secondary fw-light"
               > ${forecastContainer.forecast.forecastday[2].day.condition.text}
            </span>
         </div>
      </div>
   </div>
</div>
</div>
   `;
   } catch (error) {
      onerror = true;
   }
}