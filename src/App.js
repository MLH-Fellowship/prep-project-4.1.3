import React, {useState, useEffect} from 'react';
import MyMap from "./components/MyMap";
import logo from "./assets/img/mlh-prep.png";
import useWeather from "./helpers/customHooks/useWeather";
import RequiredThings from "./components/RequiredThings";
<<<<<<< HEAD
import Background from "./components/Background";
import Loader from './components/Loader';
import SearchOption from './helpers/SearchOption/SearchOption';
import Toggle from 'react-toggle'
import "react-toggle/style.css"
=======
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import SearchOption from './helpers/SearchOption/SearchOption';
import alanBtn from "@alan-ai/alan-sdk-web";
>>>>>>> 8c7e18a900397b403281fdff514a315fe173894d

const App = () => {
  const {
    city,
    results,
    isLoading,
    isLoaded,
    setCity,
    error,
	cityRes,
    fetchWeatherUsingCoordinates,
<<<<<<< HEAD
    changeUnit,
=======
    cityObj,
    setCityObj
>>>>>>> 8c7e18a900397b403281fdff514a315fe173894d
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

  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-wrapper");
      if (el) {
        el.remove();
        setReactLoading(!reactLoading);
      }
    });
  }, []);
  

  return (
    <>
<<<<<<< HEAD
    {results && <div>
      <div className="navbar">
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <label className="toggle-div">
        <span>°C</span>
          <Toggle
            defaultChecked={false}
            className="toggle"
            icons={false}
            onChange = {(event) => changeUnit(event.target.checked)}
          />
          <span>°F</span>
        </label>
      </div>
      <Background result={results}>
        <h2>Enter a city below 👇</h2>
        <SearchOption 
          city={city} 
          onChange={(event) => setCity(event.target.value)} 
          updateCity={(city) => setCity(city)} 
        />
=======
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>

      <div className="locator">
              <div className="searchbox">
                <div>
                  <h2>Enter a city below 👇</h2>
                </div>
                <SearchOption
                  city={city}
                  onChange={(event) => setCity(event.target.value)} 
                  updateCity={(city) => setCity(city)} 
                  updateCityObj={(city) => setCityObj(city)}
                />
              </div>
              <div className="mymap">
                {cityRes && (<MyMap
                      lon={cityRes?.coord?.lon}
                      lat={cityRes?.coord?.lat}
                      name={cityRes?.name}
                      fetchWeatherUsingCoordinates={fetchWeatherUsingCoordinates}
                      temp={cityRes?.main.feels_like}
                />)}
              </div>
            </div>
>>>>>>> 8c7e18a900397b403281fdff514a315fe173894d
        {isLoading && (
          <>
            <div style = {{marginTop: '100px'}} className = "loader-svg">
              <Loader />
            </div>
          </>
        )}
        {/* {console.log("error " + error)}
        {console.log("results" + results)} */}

        {isLoaded && error && (
          <div>Error: {error.message}</div>
        )}

        {isLoaded && results && error==null && (
          <>
<<<<<<< HEAD
            <div className="Results">
              <h3>{results.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}{results.unitText}</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </div>
=======
            <WeatherCard results={results} city={cityRes}/>
>>>>>>> 8c7e18a900397b403281fdff514a315fe173894d

            

            <div>
              <RequiredThings results={cityRes} />
            </div>
          </>
        )}
<<<<<<< HEAD
        </Background>
      </div>}
=======

      </div>
>>>>>>> 8c7e18a900397b403281fdff514a315fe173894d
    </>
  );
};

export default App;
