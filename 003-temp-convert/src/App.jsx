"use client"

import { useEffect, useState } from "react"
import "./App.css"

const TEMPERATURES = [
  { value: null, name: "Celsius", symbol: "°C" },
  { value: 32, name: "Fahrenheit", symbol: "°F" },
  { value: 273.15, name: "Kelvin", symbol: "K" },
]

const convertTemperature = (from, to, value) => {
  if (from.name === to.name) return value

  // Convertir a Celsius primero
  let celsius
  switch (from.name) {
    case "Celsius":
      celsius = value
      break
    case "Fahrenheit":
      celsius = ((value - 32) * 5) / 9
      break
    case "Kelvin":
      celsius = value - 273.15
      break
    default:
      return value
  }

  // Convertir de Celsius a la temperatura objetivo
  switch (to.name) {
    case "Celsius":
      return celsius
    case "Fahrenheit":
      return (celsius * 9) / 5 + 32
    case "Kelvin":
      return celsius + 273.15
    default:
      return value
  }
}

function App() {
  const [temps, setTemps] = useState(TEMPERATURES)



  const handleChange = (e, changedTemp) => {
    const newValue = parseFloat(e.target.value)
    if (isNaN(newValue)) return

    const updatedTemps = temps.map((temp) => {
      if (temp.name === changedTemp.name) {
        return { ...temp, value: newValue }
      } else {
        const convertedValue = convertTemperature(changedTemp, temp, newValue)
        return { ...temp, value: convertedValue }
      }
    })

    setTemps(updatedTemps)
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Conversor de Temperatura</h1>
      {temps.map((temp) => (
        <div key={temp.name} className="mb-4">
          <label htmlFor={temp.name} className="block mb-2">
            {temp.name}
          </label>
          <input
            type="number"
            id={temp.name}
            onChange={(e) => handleChange(e, temp)}
            value={temp.value}
            className="w-full p-2 border rounded"
          />
          <span className="ml-2">{temp.symbol}</span>
        </div>
      ))}
    </main>
  )
}

export default App
