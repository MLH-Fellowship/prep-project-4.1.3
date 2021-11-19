import React from 'react'
import { useState } from "react";
import weatherIcon from './weatherIcon';
import {Droplet, Wind, Thermometer} from 'react-feather';

function DailyForecast({results}) {

    const [arr,setArr] = useState(results.daily.slice(1,7));
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dayss = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    
    return (
        <>
        <h2>Daily Forecast</h2>
        <div className="daily-forecast">
            {arr.map((dayWeather) => {
                const t=new Date(dayWeather.dt*1000);
                const avgTemp=dayWeather.temp.min+dayWeather.temp.max/2;
                return(
                    <div className="daily-div">
                        <h3>
                            {dayss[t.getDay()]}, {t.getDate()} {month[t.getMonth()]}
                        </h3>
                        
                        <div className="dailyweather-icondiv">
                            {weatherIcon(dayWeather.weather[0].icon)}
                            <span>{avgTemp.toPrecision(4)} °C</span>
                            {/* <img className="dail-forecast-img" src={"https://openweathermap.org/img/wn/" + dayWeather.weather[0].icon + ".png"} /> */}
                        </div>
                        <div className="dailyweather-desc">{dayWeather.weather[0].main}</div>
                        <div className="dailyweather-down">
                            <span>
                            <Droplet size={20}/>{dayWeather.humidity} %
                            </span>
                            <span>
                            <Wind size={20}/>{dayWeather.wind_speed}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default DailyForecast
