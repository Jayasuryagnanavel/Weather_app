import React, { useState, useEffect } from 'react';
import './weatherApp.css'
function WeatherApp() {
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = '2fa73590fd8b5a4c6e68098ad5625395';

    const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error(error));
    });
    // console.log(weatherData.weather[0]);
  }, [API_KEY]);


  const bgArray = [
    { value: 'thunderstorm', image: './images/Thunderstrom.jpg' },
    { value: 'few clouds', image: './images/Drizzle.jpg' },
    { value: 'rain', image: './images/Rain.jpg' },
    { value: 'shower rain', image: './images/Snow.jpg' },
    { value: 'mist', image: './images/Mist.jpg' },
    { value: 'scattered clouds', image: 'pear.jpg' },
    { value: 'broken clouds', image: './images/haze.jpg' },
    { value: 'clear sky', image: 'pear.jpg' },
    { value: 'snow', image: 'pear.jpg' },
    // { value: 'Smoke', image: 'pear.jpg' },
    // { value: 'Sand', image: 'pear.jpg' },
    // { value: 'Ash', image: 'pear.jpg' },
    // { value: 'Squall', image: 'pear.jpg' },
    // { value: 'Tornado', image: 'pear.jpg' },
  ];
//   inputValue = weatherData.weather[0].description;

  function getImageForValue() {
    const matchingObject = bgArray.find(obj => obj.value === inputValue);
    return matchingObject ? matchingObject.image : null;
  }

  function handleInputChange(event) {
    setInputValue(weatherData.weather[0].value);
  }  
//   console.log(inputValue());
  
  const backgroundImage = getImageForValue();
const containerStyle = {
  backgroundImage: `url(${backgroundImage})`,
};

  return (
    <div>
      {weatherData &&
        <div>
            <div className="container" style={containerStyle}>
                <div className="header">
                    <h1>Gi's Weather App</h1>
                </div>
                <div className="c">
                    <div className="content">
                        <h2>{weatherData.name}</h2>
                        <p>{weatherData.weather[0].description}</p>
                        <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
                    </div>
                </div>
            </div>
        </div>
      }
    </div>
    
  );
}

export default WeatherApp;
