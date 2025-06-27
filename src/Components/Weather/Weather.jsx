import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Search from '../Search/search';

const Weather = () => {

    const [ loading, setLoading ] = useState(false);
    const [ search, setSearch ] = useState("Wyoming");
    const [ weatherData, setWeatherData ] = useState([]);

    function getCurrentDayAndTime(){
    return new Date().toLocaleDateString( "en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    }

    function convertKelvinToCelsius(){
        return Math.floor(weatherData?.main?.temp - 273.15);
    }

    const [error, setError] = useState("");
    async function fetchWeatherData(search){
        if (!search || search.trim() === "") {
            setError("Please enter a city name.");
            setWeatherData({});
            setLoading(false);
            return;
        }
        setLoading(true);
        setError("");
        try{
          setSearch(search)
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=de8fe0e6430a2a8265e3981601e97e9d`);
          const data = await response.json();
          console.log(data)
          if (data.cod === "404" || data.cod === 404) {
            setError("City not found. Please check the spelling or try another city.");
            setWeatherData({});
          } else {
            setWeatherData(data);
          }
          setLoading(false);
        } catch(e){
            setLoading(false);
            setError("An error occurred. Please try again later.");
            console.log(e.message);
        }
    }

    useEffect( ()=> { fetchWeatherData(search)}, [])

    function handleSearch(){
        fetchWeatherData(search);
    }


  return (
    <div className="weather-container pt-5" style={{backgroundImage: `url(/sunny.jpg)`}}>
        <h3 className="text-center">Enter your city below to get its weather details</h3>
      <div className="inner-container col-lg-5 col-11 rounded-4 px-2 pt-3">
        <Search  setSearch={setSearch} handleSearch={handleSearch} search={search}/>
        { loading 
          ? (
              <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100px'}}>
                <div className="spinner-border text-dark" role="status" style={{ width: "3rem", height: "3rem" }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )
          : error ? (
              <p className='text-center text-danger'><strong>{error}</strong></p>
            ) : (
            <div> 
              <div className="w-10">
                <p className='text-center'> <strong> { weatherData?.name + ", " + weatherData?.sys?.country } </strong></p>
                <p className='text-center'><em> {getCurrentDayAndTime()} </em></p>
                <p className='text-center fs-1'><strong>{ convertKelvinToCelsius()}&deg;C</strong></p>
                <p className='text-center'>{weatherData?.weather?.[0]?.description}</p>
              </div>                      
              <div className="d-flex justify-content-around">
                <div className="text-center">
                  <p className="mb-0"><strong>{weatherData?.wind?.speed}</strong></p>
                  <p className="mt-0"><strong>Wind Speed</strong></p>
                </div>
                <div className="text-center">
                  <p className="mb-0"><strong>{weatherData?.main?.humidity}%</strong></p>
                  <p className="mt-0"><strong>Humidity</strong></p>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Weather;