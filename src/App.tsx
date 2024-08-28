/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import axios from 'axios';
import { useState, useRef } from 'react';

function App() {
  const [weather, setWeather] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validateInput(): boolean {
    const value = inputRef.current?.value || '';
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!regex.test(value)) {
      setError('Por favor, insira apenas letras e espaços.');
      return false;
    }
    setError(null); // Limpa o erro se a validação for bem-sucedida
    return true;
  }

  async function searchCity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // evita o recarregamento da página
    const city = inputRef.current?.value;
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    if (!city) {
      setError('Por favor, digite o nome de uma cidade.');
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = ''; // Limpa o campo de input
    }

    if (!validateInput()) {
      return; // Não continua se a validação falhar
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
      setError(null);

      const { data } = await axios.get(url);
      setWeather(data);
      console.log(weather);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        // Verifica se é um erro do Axios
        if (err.response && err.response.status === 404) {
          setError('Cidade não encontrada. Por favor, verifique o nome e tente novamente.');
        } else {
          setError('Erro ao buscar os dados do clima. Tente novamente mais tarde.');
        }
      } else {
        setError('Ocorreu um erro inesperado.');
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
