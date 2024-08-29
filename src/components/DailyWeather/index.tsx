/* eslint-disable react/react-in-jsx-scope */
import { WeatherInfo } from '../../types/weatherInfo-types.tsx';
import styles from './DailyWeather.module.css';

interface DailyWeatherProps {
  weatherInfo: WeatherInfo | null;
}

function DailyWeather({ weatherInfo }: DailyWeatherProps) {
  if (!weatherInfo) {
    return null; // Não renderiza nada se não houver dados
  }

  // const weatherIconClassName = `icon ${weatherInfo.weather[0].icon} `;
  return (
    <div className={styles.weather_info}>
      <div>
        <h2>{weatherInfo.name}</h2>
        <p>{`País: ${weatherInfo.sys.country}`}</p>
        <div className={`icon ${weatherInfo.weather[0].icon} `}>
          Ícone para
          {' '}
          {weatherInfo.weather[0].description}
        </div>
        <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} alt="Ícone do clima" />
        <p>{`Descrição: ${weatherInfo.weather[0].description}`}</p>
      </div>
      <div>
        <p>{`Temperatura: ${weatherInfo.main.temp}°C`}</p>
        <p>{`Temperatura Mínima: ${weatherInfo.main.temp_min}°C`}</p>
        <p>{`Temperatura Máxima: ${weatherInfo.main.temp_max}°C`}</p>
      </div>
      <p>{`Umidade: ${weatherInfo.main.humidity}%`}</p>
    </div>
  );
}

export default DailyWeather;
