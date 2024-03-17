import { useState } from 'react';
import './App.css'; 

const apiKey = "312abfd953c970ceaf81f671079f6e22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city, setData, setError) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (response.status === 404) {
      setError("City not found");
      setData(null); // change it to null so weatherData won't run
    } 
    else {
      const data = await response.json();
      setData(data);
      setError(null); // change it to null so error won't run
    }
  } 

  catch (error) {
    console.error("Error fetching data:", error);
    setError("Error fetching data");
    setData(null); // Clear the data
  }
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // const handleSearch = () => {
  //   checkWeather(city, setWeatherData, setError);
  // };

  return (
    <>
      <div>
        <p>Check City Weather</p>
        <input
          type='text'
          placeholder='Enter City Name'
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button onClick={()=>{checkWeather(city, setWeatherData, setError)}}>Search</button>

        {error ? ( <p className="error">{error}</p> ) : weatherData ? 
        (
          <div>
            <p>{weatherData.name}</p>
            <p>{Math.round(weatherData.main.temp)}°C</p>
          </div>
        ) : null}
          
      </div>
    </>
  );
}

export default App;
