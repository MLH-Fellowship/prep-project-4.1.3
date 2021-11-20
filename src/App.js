import React, {useState, useEffect} from 'react';
import MyMap from "./components/MyMap";
import logo from "./assets/img/mlh-prep.png";
import useWeather from "./helpers/customHooks/useWeather";
import RequiredThings from "./components/RequiredThings";
import Background from "./components/Background";
import Loader from './components/Loader';
import SearchOption from './helpers/SearchOption/SearchOption';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

const App = () => {
  const {
    city,
    results,
    isLoading,
    isLoaded,
    setCity,
    error,
    fetchWeatherUsingCoordinates,
    changeUnit,
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
              <p>Feels like {results.main.feels_like}{results.unitText}</p>
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
        </Background>
      </div>}
    </>
  );
};

export default App;
