import { useEffect, useState } from "react";
import logo from "./assets/img/mlh-prep.png";
import MyMap from "./components/MyMap";
import { useDebounce } from "./helpers";

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 1000ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(city, 1000);

  // Effect for API call
  useEffect(
    () => {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          debouncedSearchTerm +
          "&units=metric" +
          "&appid=" +
          process.env.REACT_APP_APIKEY
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);

            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              setResults(result);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}

          {isLoaded && results && (
            <>
              <h3>{results?.weather[0].main}</h3>
              <p>Feels like {results.main.feels_like}°C</p>
              <i>
                <p>
                  {results.name}, {results.sys.country}
                </p>
              </i>
            </>
          )}
        </div>
      </div>

      {isLoaded ? (
        <MyMap
          lon={results?.coord?.lon}
          lat={results?.coord?.lat}
          name={results?.name}
        />
      ) : (
        <h3>Map is Loading...</h3>
      )}
    </>
  );
};

export default App;
