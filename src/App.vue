<template>
  <div id="app">
    <Gradient ref="Gradient" />
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Please enter your location..."
          v-model="query"
          @keypress="fetchWeather"
          icon="search"
        />
      </div>

      <div class="weather-wrap" v-if="typeof weather.city_name != 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.city_name }}, {{ weather.country_code }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temperature">{{ weather.temp }} ℃</div>
          <div class="weather">{{ weather.weather.description }}</div>
        </div>
        <div v-for="dailyForecast in forecast" :key="dailyForecast.valid_date">
          <Forecast
            v-bind:temp="dailyForecast.temp"
            v-bind:date="new Date(dailyForecast.datetime)"
          />
          <!-- <p>{{ dailyForecast.temp }}, {{ dailyForecast.datetime }}</p> -->
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      api_key: "a9749520d5ef477ebcc7e362708bc2b0",
      url_base: "http://api.weatherbit.io/v2.0",
      query_units: `&units=metric`,
      query_key_param: "&key=",
      query: "",
      weather: {},
      forecast: [],
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key == "Enter") {
        fetch(
          `${this.url_base}/current/weather?city=${this.query +
            this.query_units +
            this.query_key_param +
            this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);

        this.fetchForecast();
      }
    },
    fetchForecast() {
      console.log(
        `${this.url_base}/forecast/daily?city=${this.query +
          this.query_units +
          this.query_key_param +
          this.api_key}`
      );

      fetch(
        `${this.url_base}/forecast/daily?city=${this.query +
          this.query_units +
          this.query_key_param +
          this.api_key}`
      )
        .then((res) => {
          return res.json();
        })
        .then(this.setForecast);
    },
    dateBuilder() {
      let d = new Date();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "Mei",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    setResults(results) {
      this.weather = results.data[0];
      this.$refs.Gradient.update(this.weather.temp);
    },
    setForecast(forecast) {
      this.forecast = forecast.data.slice(1, 8);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

#app {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}

#gradient {
  background: linear-gradient(
    0deg,
    #102f7e 0%,
    #0c8dd6 12.5%,
    #1aa0ec 25%,
    #60c6ff 37.5%,
    #9bdbff 50%,
    #b4deda 62.5%,
    #ffd66b 75%,
    #ffc178 87.5%,
    #fe9255 100%
  );
  position: fixed;
  width: 100%;
  height: 500%;
  z-index: -100;
  /* left: -1000px; */
  /* top: -50% */
}

main {
  min-height: 100vh;
  padding: 25px;
  /* background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  ); */
}

.search-box {
  width: 100;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temperature {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 120px;
  font-weight: 600;
  font-style: normal;
  line-height: 120px;
  font-family: poppins;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: 2px 4px rgba(0, 0, 0, 0.25);
}

.weather-box .weather {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
</style>
