import React, { useState, useEffect } from 'react'
import axios from "axios";
import clear from "../Background/ClearSkyBackground/clear-sky.jpg"
import cloud from "../Background/CloudsBackground/clouds-background.jpg"
import dust from "../Background/DustBackground/dustbg.jpg"
import fog from "../Background/FogBackground/fog-background.jpg"
import rainy from "../Background/RainyBackground/rain-background.jpg"
import snow from "../Background/SnowBackground/snow.jpg"
import sunny from "../Background/SunnyBackground/sunny.jpg"
import thunder from "../Background/ThunderstromBackground/thunder-background.jpg"
import tornado from "../Background/ThunderstromBackground/tornado-background.jpg"

const BookmarkCard = ({ place }) => {
    const BASE_URL = "https://api.openweathermap.org/data/2.5/";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [wind, setWind] = useState("");
    const [humidity, setHumidity] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [temperature, setTemperature] = useState("");
    const [weekly, setWeekly] = useState([]);
    const [minTemp, setminTemp] = useState([]);
    const [maxTemp, setmaxTemp] = useState([]);
    const [weatherCondition, setWeather] = useState("Clear");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const selectBackground = () => {
        console.log("This is the desc inside the function:", weatherCondition)
        console.log(typeof (weatherCondition))
        if (weatherCondition === "Clear") return clear;
        else if (weatherCondition === "Sunny") return sunny;
        else if (weatherCondition === "Clouds") return cloud;
        else if (weatherCondition === "Rain" || weatherCondition === "Drizzle") return rainy;
        else if (weatherCondition === "Snow") return snow;
        else if (weatherCondition === "Thunderstorm") return thunder;
        else if (weatherCondition === "Tornado") return tornado;
        else if (weatherCondition === "Ash" || weatherCondition === "Squall" || weatherCondition === "Dust" || weatherCondition === "Sand") return dust;
        else if (weatherCondition === "Smoke" || weatherCondition === "Haze" || weatherCondition === "Mist" || weatherCondition === "Fog") return fog;
        else return clear;
    }

    useEffect(() => {
        async function getDetails() {
            const { data } = await axios.get(
                `${BASE_URL}weather?q=${place}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
            );
            const { coord } = data; //long lat
            const { lat, lon } = coord;
            let oneApiData = await axios.get(
                `${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_APIKEY}`
            );
            oneApiData = oneApiData.data;
            const { current } = oneApiData;
            setWeather(current.weather[0].main);
            console.log(weatherCondition)

            setWind(current.wind_speed);
            setHumidity(current.humidity);
            setIcon(current.weather[0].icon);
            setDescription(current.weather[0].description);

            let temp = current.temp;

            setTemperature(temp);

            const requiredDays = [];
            const date = new Date().getDay();
            for (let i = date; i < date + 5; i++) requiredDays.push((i + 1) % 7);

            setWeekly(
                requiredDays.map((idx) => {
                    return days[idx];
                })
            );
            const daily = oneApiData.daily;
            const filteredDailyData = daily.filter((ele, idx) => {
                return idx < 5;
            });
            setminTemp(
                filteredDailyData.map((dailyObject, idx) => {
                    return dailyObject.temp.min;
                })
            );

            setmaxTemp(
                filteredDailyData.map((dailyObject, idx) => {
                    return dailyObject.temp.max;
                })
            );
        }
        getDetails();
    }, []);

    return (
        <div style={{ padding: "25px" }} className="bookmarkCard" style={{ backgroundImage: `url(${selectBackground()})` }}>
            <div className="bookmarkCard-fav">
                <h1>{capitalizeFirstLetter(place)}</h1>
                <h3 className="head-fav">
                    {capitalizeFirstLetter(description)}
                    <br />
                    <span>
                        Wind{" "}
                        {Math.floor(wind).toPrecision(3) + " m/s"}{" "}
                        <span className="dot">•</span> Humidity {humidity}%
                    </span>
                </h3>
                <div className="bookmarkCard-temp">
                    <h1 className="h1-heading">
                        {Math.floor(temperature).toPrecision(4) + " °C"}
                    </h1>
                    <div className="image">
                        <img
                            src={`http://openweathermap.org/img/w/${icon}.png`}
                            className="imageicon"
                            alt="icon"
                        />
                    </div>
                </div>
                <table className="bookmarkCard-table">
                    <tr>
                        {weekly.map((day) => {
                            return <td>{day}</td>;
                        })}
                    </tr>
                    <tr>
                        {minTemp.map((temp) => {
                            return (
                                <td>
                                    {Math.floor(temp).toPrecision(2) + " °C"}
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {maxTemp.map((temp) => {
                            return (
                                <td>
                                    {Math.floor(temp).toPrecision(2) + " °C"}
                                </td>
                            );
                        })}
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default BookmarkCard;
