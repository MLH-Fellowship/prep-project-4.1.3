import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import alanBtn from '@alan-ai/alan-sdk-web';

import MyMap from '../../components/MyMap';
import Loader from '../../components/Loader';
import Background from '../../components/Background';
import WeatherCard from '../../components/WeatherCard';
import RequiredThings from '../../components/RequiredThings';

import useWeather from '../../helpers/customHooks/useWeather';
import SearchOption from '../../helpers/SearchOption/SearchOption';

import logo from '../../assets/img/mlh-prep.png';

import 'react-toggle/style.css';

const HomePage = () => {
	const {
		city,
		results,
		isLoading,
		isLoaded,
		setCity,
		error,
		cityRes,
		fetchWeatherUsingCoordinates,
		changeUnit,
		cityObj,
		setCityObj,
	} = useWeather();

	useEffect(() => {
		//adding alan ai button on home page
		alanBtn({
			key: process.env.REACT_APP_ALAN_APIKEY,
			onCommand: function (commandData) {
				if (commandData.command === 'city') {
					//setting city to show the weather of the vity asked through voice command
					setCity(commandData.cityname.value);
				}
			},
			zIndex: 10000000,
		});
	}, []);

	return (
		<>
			{!isLoaded && (
				<div className='loader-wrapper'>
					<Loader />
				</div>
			)}

			{results && (
				<div>
					<div className='navbar'>
						<img className='logo' src={logo} alt='MLH Prep Logo'></img>
						<label className='toggle-div'>
							<span>°C</span>
							<Toggle
								defaultChecked={false}
								className='toggle'
								icons={false}
								onChange={(event) => changeUnit(event.target.checked)}
							/>
							<span>°F</span>
						</label>
					</div>

					<Background result={results}>
						<div className='locator'>
							<div className='searchbox'>
								<div>
									<h2>Enter a city below 👇</h2>
								</div>
								<SearchOption
									city={city}
									onChange={(event) => setCity(event.target.value)}
									updateCity={(city) => setCity(city)}
									updateCityObj={(city) => setCityObj(city)}
								/>
							</div>
							<div className='mymap'>
								{cityRes && (
									<MyMap
										lon={cityRes?.coord?.lon}
										lat={cityRes?.coord?.lat}
										name={cityRes?.name}
										fetchWeatherUsingCoordinates={fetchWeatherUsingCoordinates}
										temp={cityRes?.main.feels_like}
									/>
								)}
							</div>
						</div>

						{isLoaded && error && <div>Error: {error.message}</div>}

						{isLoaded && results && error == null && (
							<>
								<WeatherCard
									results={results}
									city={cityRes}
									changeUnit={changeUnit}
								/>

								<div>
									<RequiredThings results={cityRes} />
								</div>
							</>
						)}
					</Background>
				</div>
			)}
		</>
	);
};

export default HomePage;
