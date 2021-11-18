import logo from './assets/img/mlh-prep.png';
import SearchOption from './helpers/SearchOption/SearchOption';
import useWeather from './helpers/customHooks/useWeather';
import RequiredThings from './components/RequiredThings';

const App = () => {
	const { city, results, isLoaded, setCity, setIsLoaded, error } = useWeather();

	if (error) return <div>Error: {error.message}</div>;

	return (
		<>
			<img className='logo' src={logo} alt='MLH Prep Logo'></img>
			<div>
				<h2>Enter a city below 👇</h2>
				<SearchOption city={city} onChange={(event) => setCity(event.target.value)} updateCity={(city) => setCity(city)} />
				{console.log(results)}
				{isLoaded && results && (
					<>
						<div className='Results'>
							<h3>{results.weather[0].main}</h3>
							<p>Feels like {results.main.feels_like}°C</p>
							<i>
								<p>
									{results.name}, {results.sys.country}
								</p>
							</i>
						</div>
						<RequiredThings results={results} />
					</>
				)}
			</div>
		</>
	);
};

export default App;
