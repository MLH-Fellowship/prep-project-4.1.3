import React, {useState, useEffect} from 'react';
import MyMap from "./components/MyMap";
import logo from "./assets/img/mlh-prep.png";
import useWeather from "./helpers/customHooks/useWeather";
import RequiredThings from "./components/RequiredThings";
import Loader from './components/Loader';
import SearchOption from './helpers/SearchOption/SearchOption';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";

const App = () => {
  const {
    city,
    results,
    isLoading,
    isLoaded,
    setCity,
    error,
    fetchWeatherUsingCoordinates,
  } = useWeather();
  
  const [reactLoading, setReactLoading] = useState(true);
  
  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 1000));
  }

  useEffect(() => {
    //adding alan ai button on home page
    alanBtn({
      key: process.env.REACT_APP_ALAN_APIKEY,
      onCommand: function (commandData) {
        if (commandData.command === "city") {
          //setting city to show the weather of the vity asked through voice command
          setCity(commandData.cityname.value);
        }
      },
      zIndex: 10000000
    });
  }, []);

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-wrapper");
      if (el) {
        el.remove();
        setReactLoading(!reactLoading);
      }
    });
  }, []);
  
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <SearchOption 
          city={city} 
          onChange={(event) => setCity(event.target.value)} 
          updateCity={(city) => setCity(city)} 
        />

        {console.log(results)}
        {isLoading && (
          <>
            <div style = {{marginTop: '100px'}} className = "loader-svg">
              <Loader />
            </div>
          </>
        )}

        {isLoaded && results && (
          <>
            <div className="Results">
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </div>

            <MyMap
              lon={results?.coord?.lon}
              lat={results?.coord?.lat}
              name={results?.name}
              fetchWeatherUsingCoordinates={fetchWeatherUsingCoordinates}
              temp={results?.main.feels_like}
            />

            <RequiredThings results={results} />
          </>
        )}
      </div>
    </>
  );
};

export default App;
