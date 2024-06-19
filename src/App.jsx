import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='flex flex-row min-h-screen justify-center items-center'>
      <div className='p-10 rounded-xl border-2 border-slate-400'>
      <form onSubmit={handleSubmit}>
        <input className='p-3 bg-slate-200 text-stone-700'
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button className='p-3 bg-slate-200 text-stone-700 hover:bg-stone-500 active:shadow-inner' type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2 className='flex text-2xl font-medium justify-center pt-10'>{weatherData.name}</h2>
          <p className='flex text-7xl font-medium justify-center pb-5'>{Math.round(weatherData.main.temp)}°C</p>
          <p className='flex text-m font-medium justify-center'>Description: {weatherData.weather[0].description}</p>
          <p className='flex text-m font-medium justify-center'>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
          <p className='flex text-m font-medium justify-center'>Humidity: {weatherData.main.humidity}%</p>
          <p className='flex text-m font-medium justify-center'>Wind Speed: {weatherData.wind.speed}m/s</p>
        </>
      ) : (
        <p className='flex justify-center pt-5'>loading data</p>
      )}
    </div>
    </div>
  );
};

export default Weather;
