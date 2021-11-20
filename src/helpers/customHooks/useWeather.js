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
  const [cityRes,setCityRes] = useState(null);

  const [latit, setLatit] = useState(0);
  const [longi, setLongi] = useState(0);

  const [cityObj,setCityObj] = useState();

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(city, 500);

  useEffect(() => {
    if(cityObj && cityObj.name)
    {
      const y=cityObj.name.indexOf(',');
      const temp=y===-1 ? cityObj.name : cityObj.name.substr(0,y);
      fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${temp}&limit=1&appid=${process.env.REACT_APP_APIKEY}`
      )
      .then((res) => res.json())
      .then(
        (result) => {
          if(result.length===0)
          {
            setError({
              "message":"No location found"
            });
          }
          else
          {
            setLatit(result[0].lat);
            setLongi(result[0].lon);
            setError(null);
          }
        }
      )
    }
  }, [cityObj])

  useEffect(() => {
    //Toast added for informing users about the voice assistant
    toast.configure()
    toast.info('Say hi to our voice assistant!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
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


      setIsLoading(true);
      setIsLoaded(false);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setCityRes(result);
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
    if (latit !== 0 && longi !==0) {
      const y=new Date();
      const tempp=y.getTime();
    setIsLoaded(false);
    if (debouncedSearchTerm !== "") {
      setIsLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latit}&lon=${longi}&dt=${tempp}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_APIKEY}`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setResults(result);
            setIsLoading(false);
            // setError(null);
          },
          (error) => {
            setIsLoading(false);
            setIsLoaded(false);
            setError(error);
          }
        );
    }
  }
  }, [longi,debouncedSearchTerm]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longi}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
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
  }, [longi])

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
    cityRes,
    fetchWeatherUsingCoordinates,
    cityObj,
    setCityObj
  };
};

export default useWeather;
