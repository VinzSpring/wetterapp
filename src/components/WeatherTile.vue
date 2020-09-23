<template>
  <v-card
    color="rgb(155,155,155,0.4)"
    class="mx-auto my-auto blur"
    style="overflow-y: hidden;"
    :width="isMobile ? '100vw' : '30vw'"
    :height="isMobile ? '100vh' : '70vh'"
  >
    <div>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{weatherSummary.closestCity}}</v-list-item-title>
          <v-list-item-subtitle>{{dateString(selectedWeather.dt)}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col
            class="display-3"
            cols="6"
          >{{Math.round(selectedWeather.temp.max ? (selectedWeather.temp.max + selectedWeather.temp.min) / 2 : selectedWeather.temp)}}&deg;C</v-col>
          <v-col cols="6">
            <v-img
              :src="`http://openweathermap.org/img/wn/${dataPoint.icon}@4x.png`"
              width="122"
              v-for="dataPoint in selectedWeather.weather"
              :key="dataPoint.icon"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-row align="center">
        <v-col class="display-3" cols="6">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-wind</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{selectedWeather.wind_speed}} km/h</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-sun</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{timeString(selectedWeather.sunrise)}}</v-list-item-subtitle>
          </v-list-item>
        </v-col>
        <v-col class="display-3" cols="6">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-water</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{selectedWeather.humidity}} %</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-moon</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{timeString(selectedWeather.sunset)}}</v-list-item-subtitle>
          </v-list-item>
        </v-col>
      </v-row>

      <v-slider v-model="dayIndex" :max="7" class="mx-4" ticks></v-slider>
      <v-divider></v-divider>
    </div>
    <v-list
      class="transparent"
      :style="{height: isMobile ? '40vh' : '20vh', overflowY: 'scroll', overflowX: 'hidden', cursor: 'n-resize'}"
    >
      <v-list-item v-for="day in weatherSummary.daily" :key="day.dt">
        <v-list-item-title>{{ dayString(day.dt) }}</v-list-item-title>
        <v-divider></v-divider>

        <v-list-item-icon>
          <v-img
            :src="`http://openweathermap.org/img/wn/${dataPoint.icon}@4x.png`"
            v-for="dataPoint in day.weather"
            :key="dataPoint.icon"
          ></v-img>
        </v-list-item-icon>

        <v-list-item-subtitle
          class="text-right"
        >{{ Math.round((day.temp.max + day.temp.min) / 2)}}&deg;C</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { IWeatherSummary, IWeatherData } from "@/api/weather";

@Component({
  name: "WeatherTile",
})
export default class WeatherTile extends Vue {
  @Prop({ required: true })
  locationName!: string;
  @Prop({ required: true })
  weatherSummary!: IWeatherSummary;

  private dayIndex = 0;

  get isMobile(): boolean {
    return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
  }

  get selectedWeather(): IWeatherData {
    if (this.dayIndex == 0) return this.weatherSummary.current;
    return this.weatherSummary.daily[this.dayIndex];
  }

  dateString(dt: number): string {
    return new Date(dt * 1000).toLocaleDateString(undefined, {
      minute: "numeric",
      hour: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  dayString(dt: number): string {
    return new Date(dt * 1000).toLocaleDateString(undefined, {
      weekday: "long",
    });
  }

  timeString(dt: number): string {
    return new Date(dt * 1000).toLocaleTimeString(undefined, {
      minute: "numeric",
      hour: "numeric",
    });
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
.blur {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.3);
  -webkit-backdrop-filter: blur(10px);
}
</style>