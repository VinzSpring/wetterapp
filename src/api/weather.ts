import axios from "axios";

const API_KEY = "0fda5fb3542a4ce4bb6be96dc3f548e8";

export interface IWeatherPoint {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IRainData {
  "1h": number;
}
export interface ISnowData {
  "1h": number;
}

export interface IWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: IWeatherPoint[];
  rain: IRainData;
  snow: ISnowData;
  pop: number;
}

export interface IWeatherSummary {
  lat: number;
  lon: number;
  closestCity: string;
  timezone: string;
  timezone_offset: number;
  current: IWeatherData;
  minutely: IWeatherData[];
  hourly: IWeatherData[];
  daily: IWeatherData[];
}

export const WEATHER = {
  async getSummary(lat: number, lon: number, unit="metric"): Promise<IWeatherSummary> {
    const weatherSummary: IWeatherSummary = (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      )
    ).data;    
    const cityName = (
      await axios.get(
        `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=10`
      )
    ).data.list[0].name;    
    
    weatherSummary.closestCity = cityName;
    return weatherSummary;
  },
};
