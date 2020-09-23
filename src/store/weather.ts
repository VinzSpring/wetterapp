import {
  Module,
  VuexModule,
  Mutation,
  Action,
  MutationAction,
  getModule
} from "vuex-module-decorators";
import API from "@/api";
import { IWeatherSummary } from "@/api/weather";
import store from '.';

@Module({
  name: "WeatherStore",
  namespaced: true,
  dynamic: true, 
  store
})
class WeatherStore extends VuexModule {
  currentWeather: IWeatherSummary | null = null;

  @MutationAction({ mutate: ["currentWeather"] })
  async fetchWeather(pos: { lat: number; lon: number }) {
    const currentWeather = await API.weather.getSummary(pos.lat, pos.lon)
    return { currentWeather };
  }
}

export default getModule(WeatherStore);
