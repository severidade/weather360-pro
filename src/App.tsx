/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';
import DailyWeather from './components/DailyWeather/index.tsx';
import { WeatherInfo } from './types/weatherInfo-types.tsx';

function App() {
  const [todayWeatherInfo, setTodayWeatherInfo] = useState<WeatherInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateInput(city: string): boolean {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!city) {
      setError('Por favor, digite o nome de uma cidade.');
      return false;
    }

    if (!regex.test(city)) {
      setError('Por favor, insira apenas letras e espaços.');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      return false;
    }

    setError(null);
    return true;
  }

  async function searchCity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodayWeatherInfo(null);

    const city = (inputRef.current?.value || '').trim().replace(/\s{2,}/g, ' ').toLowerCase();
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    // Verificando a entrada de dados
    if (!validateInput(city)) {
      return; // para se a validação falhar
    }

    if (inputRef.current) {
      inputRef.current.value = ''; // Limpa o campo de input após a validação de entrada de dados
    }

    try {
      setError(null);
      const { data } = await axios.get(url);

      console.log('Dados do clima recebidos:', data);
      setTodayWeatherInfo(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 404) {
          setError('Cidade não encontrada. Por favor, verifique o nome e tente novamente.');
        } else {
          setError('Erro ao buscar os dados do clima. Tente novamente mais tarde.');
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <>
      <h1>Weather360 Pro</h1>
      <form onSubmit={searchCity}>
        <input
          ref={inputRef}
          inputMode="text"
          type="text"
          placeholder="Digite o nome da cidade"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DailyWeather data={todayWeatherInfo} />
    </>
  );
}

export default App;

// para saber quantos icones preciso
// https://github.com/yuvraaaj/openweathermap-api-icons
// https://openweathermap.org/weather-conditions
