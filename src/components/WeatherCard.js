import React from 'react';
import {Droplet, Wind, Thermometer} from 'react-feather';
import HourlyForecast from '../helpers/HourlyForecast';
import DailyForecast from '../helpers/DailyForecast';

const WeatherCard = ({results,city}) => {

    return (
      <>
            <div className="weather-card">
              <div className="weatherCard-current ">
                <h2>Weather in {city.name}, {city.sys.country}</h2>
                <div className="weather-currentInner">
                  <div>
                  <img className="weatherCard-current-img" src={"https://openweathermap.org/img/wn/" + city.weather[0].icon + ".png"} />
                  </div>
                  <div>
                    <h1>{city.main.feels_like}°C</h1>
                    <p>{city.weather[0].main}</p>
                  </div>
                  <div className="othercurrent-info">
                    <div className="otherinfo-child">
                      <Droplet className="otherinfo-icons" size={30}/>
                      <div>
                        <strong>Humidity</strong>
                        <br/>
                        <span className="otherinfo-childspan">{city.main.humidity} %</span>
                      </div>
                    </div>
                    <div className="otherinfo-child">
                      <Thermometer className="otherinfo-icons" size={30}/>
                      <div>
                        <strong>Temp</strong>
                        <br/>
                        <span className="otherinfo-childspan">{city.main.temp_max}/{city.main.temp_min} °C</span>
                      </div>
                    </div>
                    <div className="otherinfo-child">
                      <Wind className="otherinfo-icons" size={30}/>
                      <div>
                        <strong>Wind Speed</strong>
                        <br/>
                        <span className="otherinfo-childspan">{city.main.humidity} mt/s</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hourly-chart">
                <h2>Hourly Forecast</h2>
                <div>
                  <HourlyForecast results={results}/>
                </div>
              </div>
            </div>
            <DailyForecast results={results}/>
      </>
    )
}

export default WeatherCard
