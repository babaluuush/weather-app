import React, { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function Forecast({ city }) {
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    if (!city) return

    const fetchForecast = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=sv`
        const res = await fetch(url)
        const data = await res.json()

        const daily = data.list.filter((item) => item.dt_txt.includes('12:00:00'))
        setForecast(daily)
      } catch (err) {
        console.error('Fel vid hämtning av prognos', err)
      }
    }

    fetchForecast()
  }, [city])

  if (!forecast.length) return null

  return (
    <div>
      <h4>5-dagarsprognos för {city}</h4>
      <ul className="grid gap-4">
  {forecast.map((day) => (
    <li
      key={day.dt}
      className="flex items-center justify-between bg-blue-100 p-3 rounded-lg shadow-sm"
    >
      <div>
        <p className="font-semibold">
          {new Date(day.dt_txt).toLocaleDateString('sv-SE', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
          })}
        </p>
        <p className="text-sm capitalize text-gray-700">{day.weather[0].description}</p>
        <p className="text-sm">
          🌡️ {day.main.temp_min.toFixed(1)}°C / {day.main.temp_max.toFixed(1)}°C
        </p>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt="Väderikon"
        className="w-12 h-12"
      />
    </li>
  ))}
</ul>

    </div>
  )
}

export default Forecast
