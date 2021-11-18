import ClearSkyBackground from "./ClearSkyBackground";
import CloudsBackground from "./CloudsBackground";
import SunnyBackground from "./SunnyBackground";
import SnowBackground from "./SnowBackground";
import ThunderstromBackground from "./ThunderstromBackground";
import FogBackground from "./FogBackground";
import DustBackground from "./DustBackground";
import RainyBackground from "./RainyBackground";
import "./background.css";

const Background = ({ children, result }) => {
  
  const weather = result.weather[0].main;
  // const weather = "Fog";
  console.log(result);

  if (weather === "Clear") {
    return <ClearSkyBackground children={children} />;
  } else if (weather === "Clouds") {
    return <CloudsBackground children={children} />;
  } else if (weather === "Sunny") {
    return <SunnyBackground children={children} />;
  } else if (weather === "Snow") {
    return <SnowBackground children={children} />;
  } else if (weather === "Thunderstorm") {
    return <ThunderstromBackground children={children} />;
  } else if (weather === "Rain" || weather === "Drizzle") {
    return <RainyBackground children={children} />;
  } else if (
    weather === "Mist" ||
    weather === "Smoke" ||
    weather === "Haze" ||
    weather === "Fog"
  ) {
    return <FogBackground children={children} />;
  } else if (
    weather === "Dust" ||
    weather === "Sand" ||
    weather === "Ash" ||
    weather === "Squall" ||
    weather === "Tornado"
  ) {
    return <DustBackground children={children} />;
  } else {
    return <div className="background">{children}</div>;
  }
};

export default Background;
