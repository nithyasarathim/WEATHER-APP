import React, { useState } from "react";
import weatherIcon from "./asset/weather.png";
import hazeIcon from "./asset/haze.png";
import rainIcon from "./asset/rain.png";
import snowIcon from "./asset/snowy.png";
import sunIcon from "./asset/sun.png";
import cloudIcon from "./asset/clouds.png";

import "./Weather.css";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestion, setSuggestion] = useState("Enter a city name to get the weather details!");
  const [icon, setIcon] = useState(weatherIcon);
  const [bgStyle, setBgStyle] = useState({ background: "#fff" });

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      if (city.trim()) {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
          );
          if (!res.ok) throw new Error("City not found");
          const data = await res.json();
          updateWeather(data);
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("Enter a city name!");
      }
    }
  };

  const updateWeather = (data) => {
    setWeatherData({
      name: `${data.name}, ${data.sys.country}`,
      temp: `${data.main.temp}°C`,
      feels_like: `${data.main.feels_like}°C`,
      description: data.weather[0].description,
      wind: `${data.wind.speed} m/s`,
    });
  
    const weatherMain = data.weather[0].main.toLowerCase();
    if (weatherMain.includes("rain")) {
      setSuggestion("Don't forget your umbrella! ☔");
      setIcon(rainIcon);
      document.body.style.background = "linear-gradient(to bottom, #5f5aa2, #305973)";
    } else if (weatherMain.includes("cloud")) {
      setSuggestion("It's cloudy outside. ☁️");
      setIcon(cloudIcon);
      document.body.style.background = "linear-gradient(to bottom, #757f9a, #d7dde8)";
    } else if (weatherMain.includes("clear")) {
      setSuggestion("It's a clear day! Enjoy the sunshine! ☀️");
      setIcon(sunIcon);
      document.body.style.background = "linear-gradient(to bottom, rgb(255, 238, 124), rgb(227, 170, 36))";
    } else if (weatherMain.includes("snow")) {
      setSuggestion("It's snowing! Stay warm! ❄️");
      setIcon(snowIcon);
      document.body.style.background = "linear-gradient(to bottom, #83a4d4, #b6fbff)";
    } else {
      setSuggestion("Visibility is low, take care! 🌫️");
      setIcon(hazeIcon);
      document.body.style.background = "linear-gradient(to bottom, #6a85b6, #bac8e0)";
    }
  };
  

  return (
    <div className="weather-container" style={bgStyle}>
      <h1>- WEATHER -</h1>
      <input
        type="text"
        placeholder="Enter city name and press Enter..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="weather-details">
        <h2>{weatherData ? weatherData.name : "-"}</h2>
        <table>
          <tbody>
            <tr>
              <td>Temperature:</td>
              <td>{weatherData ? weatherData.temp : "-"}</td>
            </tr>
            <tr>
              <td>Feels Like:</td>
              <td>{weatherData ? weatherData.feels_like : "-"}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{weatherData ? weatherData.description : "-"}</td>
            </tr>
            <tr>
              <td>Wind Speed:</td>
              <td>{weatherData ? weatherData.wind : "-"}</td>
            </tr>
          </tbody>
        </table>
        <img src={icon} alt="Weather Icon" />
        <p id="sugg">{suggestion}</p>
      </div>
    </div>
  );
}
