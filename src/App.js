import logo from './assets/img/mlh-prep.png';
import useWeather from './helpers/customHooks/useWeather';
import RequiredThings from './components/RequiredThings';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';

const App = () => {
	const { city, results, isLoaded, setCity, setIsLoaded, error, cityRes } = useWeather();

	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<img className='logo' src={logo} alt='MLH Prep Logo'></img>
			<div>
				<h2>Enter a city below 👇</h2>
				<input
					type='text'
					value={city}
					onChange={(event) => setCity(event.target.value)}
				/>
				{!isLoaded && <h2>Loading...</h2>}
				{console.log(results)}
				{isLoaded && results && (
					<>
					<WeatherCard results={results} city={cityRes}/>
					<RequiredThings results={cityRes} />
					</>
				)}
			</div>
		</>
	);
};

export default App;
