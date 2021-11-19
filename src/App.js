import MyMap from "./components/MyMap";
import logo from "./assets/img/mlh-prep.png";
import useWeather from "./helpers/customHooks/useWeather";
import RequiredThings from "./components/RequiredThings";
import WeatherCard from './components/WeatherCard';
import SearchOption from './helpers/SearchOption/SearchOption';

const App = () => {
  const {
    city,
    results,
    isLoaded,
    setCity,
    error,
	cityRes,
    fetchWeatherUsingCoordinates,
    cityObj,
    setCityObj
  } = useWeather();

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
          updateCityObj={(city) => setCityObj(city)} 
        />

        {!isLoaded && <h2>Loading...</h2>}

        {isLoaded && results && (
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
