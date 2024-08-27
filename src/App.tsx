/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';

function App() {
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function searchCity() {
    const city = inputRef.current?.value;
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    if (!city) {
      setError('Por favor, digite o nome de uma cidade.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
      setError(null); // Limpa o erro antes da nova requisição
      const { data } = await axios.get(url);
      setWeather(data);
    } catch (error) {
      setError('Erro ao buscar os dados do clima.');
    }
  }

  return (
    <>
      <h1>Olá mundo</h1>
      <p>este é meu app</p>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      <button type="button" onClick={searchCity}>
        Buscar
      </button>
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
