import logo from './assets/img/mlh-prep.png';
import useWeather from './helpers/customHooks/useWeather';
import RequiredThings from './components/RequiredThings';
import Background from './components/Background';

const App = () => {
	const { city, results, isLoaded, setCity, setIsLoaded, error } = useWeather();

	if (error) return <div>Error: {error.message}</div>;

	return (
		<>

		{results && (<div>
			<img className='logo' src={logo} alt='MLH Prep Logo'></img>
			<Background result={results}>
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
			</Background>
		</div>)}
			
		</>
	);
};

export default App;
