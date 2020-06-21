<template>
  <div>
    <h1>{{ dateBuilder(date) }}</h1>
    <div>{{ temp }} ℃</div>
  </div>
</template>
<script>
export default {
  name: "forecast",
  props: {
    date: Date,
    temp: Number,
  },
  methods: {
    dateBuilder: function(d) {
      // let months = [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "Mei",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];
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

      return `${day}`;
    },
  },
};
</script>
