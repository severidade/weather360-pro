export interface WeatherInfo {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
}
