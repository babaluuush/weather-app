import React, { useState } from 'react'
import Weather from './Weather'
import SearchWeather from './SearchWeather'
import Forecast from './Forecast'

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updated = [...favorites, city]
      setFavorites(updated)
      localStorage.setItem('favorites', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <h1>Väderapplikation</h1>

      {/* Väder för nuvarande plats */}
      <Weather />

      {/* Sökfunktion */}
      <SearchWeather onAddFavorite={addFavorite} />

      {/* Favoritplatser med 5-dagarsprognos */}
      <h2>Favoritplatser</h2>
      {favorites.map((city) => (
        <div key={city}>
          <p>{city}</p>
          <Forecast city={city} />
        </div>
      ))}
    </div>
  )
}

export default App
