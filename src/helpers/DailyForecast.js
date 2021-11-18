import React from 'react'
import { useState } from "react";

function DailyForecast({results}) {

    const [arr,setArr] = useState(results.daily.slice(1,7));
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    return (
        <>
        <h2>Daily Forecast</h2>
        <div className="daily-forecast">
            {arr.map((dayWeather) => {
                const t=new Date(dayWeather.dt*1000);
                const avgTemp=dayWeather.temp.min+dayWeather.temp.max/2;
                console.log(dayWeather);
                return(
                    <div className="daily-div">
                        <h3>
                            {t.getDate()} {month[t.getMonth()]}
                        </h3>
                        <div>
                            <img className="dail-forecast-img" src={"https://openweathermap.org/img/wn/" + dayWeather.weather[0].icon + ".png"} />
                        </div>
                        <h3 style={{
                            marginTop:'0'
                        }}>
                            {avgTemp.toPrecision(4)} °C
                        </h3>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default DailyForecast
