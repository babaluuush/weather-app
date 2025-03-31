import React, { useState } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function SearchWeather({ onAddFavorite }) {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const fetchWeather = async () => {
    if (!city) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sv&appid=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.cod === 200) {
        setWeatherData(data)
        setError(null)
      } else {
        setError('Staden kunde inte hittas')
        setWeatherData(null)
      }
    } catch (err) {
      setError('Fel vid hämtning av data')
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4 mb-8">
      <h2 className="text-xl font-semibold text-blue-700">Sök väder</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ange stad"
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sök
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">{error}</p>}

      {weatherData && (
        <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm">
          <div>
            <h3 className="text-lg font-semibold">{weatherData.name}</h3>
            <p className="capitalize">{weatherData.weather[0].description}</p>
            <p className="text-xl font-bold">{weatherData.main.temp.toFixed(1)}°C</p>
            <button
              onClick={() => onAddFavorite(weatherData.name)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Lägg till som favorit
            </button>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Väderikon"
            className="w-16 h-16"
          />
        </div>
      )}
    </div>
  )
}

export default SearchWeather
    