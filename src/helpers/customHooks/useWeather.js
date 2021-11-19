import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useWeather = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [useFahrenheit, changeUnit] = useState(false);

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(city, 500);

  useEffect(() => {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    function onSuccess(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let unit = useFahrenheit? 'imperial': 'metric';

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=${unit}&lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCity(result.name);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }

    function onError(error) {
      toast.configure();
      toast.error("Location access denied!", {
        theme: "light",
        hideProgressBar: false,
        closeButton: true,
        position: "top-right",
        autoClose: 3000,
      });
      setCity("New York City");
    }

    window.navigator.geolocation.getCurrentPosition(
      onSuccess,
      onError,
      options
    );
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      let unit = useFahrenheit? 'imperial': 'metric';
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          debouncedSearchTerm +
          "&units=" +
          unit +
          "&appid=" +
          process.env.REACT_APP_APIKEY
      )
        .then((res) => res.json())
        .then(
          (result) => {
            if (result["cod"] !== 200) {
              setIsLoaded(false);
            } else {
              setIsLoaded(true);
              result.unitText = useFahrenheit? "°F": "°C";
              setResults(result);

              // Scroll To Top if request is successful
              window.scrollTo(0, 0);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [debouncedSearchTerm, useFahrenheit]);

  const fetchWeatherUsingCoordinates = ({ lat, lng }) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_APIKEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCity(result.name);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return {
    city,
    results,
    isLoaded,
    setCity,
    setIsLoaded,
    error,
    fetchWeatherUsingCoordinates,
    changeUnit,
  };
};

export default useWeather;
