/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';

function App() {
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function searchCity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // evita o recarregamento da página
    const city = inputRef.current?.value;
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    if (!city) {
      setError('Por favor, digite o nome de uma cidade.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
      setError(null);
      const { data } = await axios.get(url);
      setWeather(data);
      console.log(weather);
    } catch (error) {
      console.log(error);
      setError('Erro ao buscar os dados do clima.');
    }
  }

  return (
    <>
      <h1>Weather360 Pro</h1>
      <form onSubmit={searchCity}>
        <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && weather.name && (
        <p>
          O nome da cidade é
          {' '}
          {weather.name}
        </p>
      )}
    </>
  );
}

export default App;
