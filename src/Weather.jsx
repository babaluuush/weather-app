import React, { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation stöds inte i din webbläsare')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=sv&appid=${API_KEY}`

        try {
          const response = await fetch(url)
          const data = await response.json()
          setWeatherData(data)
        } catch (err) {
          setError('Kunde inte hämta väderdata')
        }
      },
      () => {
        setError('Kunde inte få platsinformation')
      }
    )
  }, [])

  if (error) {
    return <p className="text-red-600 font-semibold">{error}</p>
  }

  if (!weatherData) {
    return <p className="text-gray-500 italic">Hämtar väder...</p>
  }

  return (
    <div className="bg-blue-50 p-6 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        Aktuellt väder i {weatherData.name}
      </h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
  <img
    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
    alt="Väderikon"
    className="w-16 h-16"
  />
  <div>
    <p className="text-lg capitalize">{weatherData.weather[0].description}</p>
    <p className="text-3xl font-semibold">{weatherData.main.temp.toFixed(1)}°C</p>
  </div>
</div>

        <div className="mt-4 md:mt-0 text-sm text-gray-600">
          <p>📅 {new Date().toLocaleDateString()}</p>
          <p>⏰ {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Weather
