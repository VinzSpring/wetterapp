<template>
  <v-app id="app">
    <v-main
      v-cloak
      :style="{backgroundImage: `url(${adequateBackgroundImageUrl})`, backgroundSize: 'cover'}"
      class="d-flex flex-row align-center"
    >
      <WeatherTile v-if="weatherSummary" locationName="Dresden" :weatherSummary="weatherSummary"></WeatherTile>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import API from "./api";
import WeatherTile from "./components/WeatherTile.vue";
import { IWeatherSummary } from "./api/weather";
import WeatherStore from "./store/weather";
import weather from "./store/weather";

@Component({
  name: "App",
  components: {
    WeatherTile,
  },
})
export default class App extends Vue {
  adequateBackgroundImageUrl = "";
  lat = 51.051554; 
  lon = 13.732672;

  get weatherSummary(): IWeatherSummary | null {
    return WeatherStore.currentWeather;
  }

  @Watch("weatherSummary")
  async onWeatherSummaryChanged(weatherSummary: IWeatherSummary) {
    this.adequateBackgroundImageUrl = await API.pixabay.getRandomImage(
      weatherSummary?.current.weather[0].description.split(' ')[1]
    );
  }

  startFetch() {
    const f = () => {
      WeatherStore.fetchWeather({ lat: this.lat, lon: this.lon});
      const tUntilNextMinute = (60000 - new Date().getTime() % 60000 + 1);      
      setTimeout(f, tUntilNextMinute);
    };
    WeatherStore.fetchWeather({ lat: this.lat, lon: this.lon }).then(f);
  }

  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos: Position) => {
        this.lat = pos.coords.latitude;
        this.lon = pos.coords.longitude;
        this.startFetch();
      }, () => {
        this.startFetch();
      });
    }
  }
}
</script>

<style scoped>

</style>