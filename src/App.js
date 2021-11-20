import React, {useState, useEffect} from 'react';
import MyMap from "./components/MyMap";
import logo from "./assets/img/mlh-prep.png";
import useWeather from "./helpers/customHooks/useWeather";
import RequiredThings from "./components/RequiredThings";
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import SearchOption from './helpers/SearchOption/SearchOption';

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
    cityObj,
    setCityObj
  } = useWeather();
  
  const [reactLoading, setReactLoading] = useState(true);
  
  function fakeRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 1000));
  }

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
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <SearchOption 
          city={city} 
          onChange={(event) => setCity(event.target.value)} 
          updateCity={(city) => setCity(city)} 
          updateCityObj={(city) => setCityObj(city)} 
        />

        {console.log(results)}
        {isLoading && (
          <>
            <div style = {{marginTop: '100px'}} className = "loader-svg">
              <Loader />
            </div>
          </>
        )}
        {console.log("error " + error)}
        {console.log("results" + results)}

        {isLoaded && error && (
          <div>Error: {error.message}</div>
        )}

        {isLoaded && results && error==null && (
          <>
            <WeatherCard results={results} city={cityRes}/>

            <MyMap
              lon={cityRes?.coord?.lon}
              lat={cityRes?.coord?.lat}
              name={cityRes?.name}
              fetchWeatherUsingCoordinates={fetchWeatherUsingCoordinates}
              temp={cityRes?.main.feels_like}
            />

            <RequiredThings results={cityRes} />
          </>
        )}

      </div>
    </>
  );
};

export default App;
