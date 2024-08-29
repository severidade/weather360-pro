/* eslint-disable react/react-in-jsx-scope */
import classNames from 'classnames';
import { WeatherInfo } from '../../types/weatherInfo-types.tsx';
import styles from './DailyWeather.module.css';

interface DailyWeatherProps {
  data: WeatherInfo | null;
}

function DailyWeather({ data }: DailyWeatherProps) {
  if (!data) {
    return null; // Não renderiza nada se não houver dados
  }

  // const weatherIconClassName = `icon ${weatherInfo.weather[0].icon} `;
  // const iconClass = classNames(styles.icon, weatherInfo.weather[0].icon);

  // const weatherIcon = `icon${weatherInfo.weather[0].icon}`; // "01n" becomes "icon01n"
  // const iconClass = styles[weatherIcon]; // Access the style with the generated string

  const iconClass2 = classNames(styles.icon, styles[`icon${data.weather[0].icon}`]);

  return (
    <div className={styles.weather_info}>
      <div>
        <h2>{data.name}</h2>
        <p>{`País: ${data.sys.country}`}</p>
        <div className={iconClass2}>
          Ícone para
          {' '}
          {data.weather[0].description}
        </div>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="Ícone do clima" />
        <p>{`Descrição: ${data.weather[0].description}`}</p>
      </div>
      <div>
        <p>{`Temperatura: ${data.main.temp}°C`}</p>
        <p>{`Temperatura Mínima: ${data.main.temp_min}°C`}</p>
        <p>{`Temperatura Máxima: ${data.main.temp_max}°C`}</p>
      </div>
      <div>
        <p>{`Umidade: ${data.main.humidity}%`}</p>
        <p>{`vento: ${data.wind.speed}m/s`}</p>
      </div>
    </div>
  );
}

export default DailyWeather;
