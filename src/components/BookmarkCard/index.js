import React, { useState, useEffect } from 'react'

const BookmarkCard = ({ location }) => {
    const [cityData, setCityData] = useState("")

    useEffect(() => {
        const fetchWeatherDetails = (location) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_APIKEY}`)
                .then((res) => res.json())
                .then((result) => {
                    setCityData(result)
                    console.log(cityData)
                })
        }
        fetchWeatherDetails(location);
    }, []);

    return (
        <div className="bookmarkCard">
            <h3 style={{ color: "black" }}>This is a place {location}</h3>
        </div>
    );
};

export default BookmarkCard;
