import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useWeather = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [cityRes,setCityRes] = useState(null);

  const [latit, setLatit] = useState(0);
  const [longi, setLongi] = useState(0);

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

      setLatit(latitude);
      setLongi(longitude);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCityRes(result);
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
    console.log(latit);
    console.log(longi);
    if (latit !== 0 && longi !==0) {
      const y=new Date();
      const tempp=y.getTime();
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latit}&lon=${longi}&dt=${tempp}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setResults(result);
            console.log(results);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [latit,longi,debouncedSearchTerm]);

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
    cityRes,
    fetchWeatherUsingCoordinates,
  };
};

export default useWeather;
