import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

const useWeather = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);

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

      setIsLoading(true);
      setIsLoaded(false);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCity(result.name);
            setIsLoading(false);
            setIsLoaded(true);
          },
          (error) => {
            setIsLoading(false);
            setIsLoaded(false);
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
    setIsLoaded(false);
    if (debouncedSearchTerm !== "") {
      setIsLoading(true);
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
            if (result["cod"] !== 200) {
              setIsLoading(false);
              setIsLoaded(false);
            } else {
              setIsLoading(false);
              setIsLoaded(true);
              setResults(result);

              // Scroll To Top if request is successful
              window.scrollTo(0, 0);
            }
          },
          (error) => {
            setIsLoading(false);
            setIsLoaded(false);
            setError(error);
          }
        );
    }
  }, [debouncedSearchTerm]);

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
    isLoading,
    isLoaded,
    setCity,
    setIsLoaded,
    error,
    fetchWeatherUsingCoordinates,
  };
};

export default useWeather;
