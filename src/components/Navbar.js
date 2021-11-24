import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Toggle from 'react-toggle';
import logo from '../assets/img/logo.svg';

const Navbar = (props) => {
	const location = useLocation();
	return (
		<div className='navbar'>
			<img className='logo' src={logo} alt='Weather Hub Logo'></img>
			<Link to='/' className='nav-item'>
				Home
			</Link>
			<Link to='/trip-planner' className='nav-item'>
				Trip Planner
			</Link>
			{location.pathname !== '/trip-planner' && (
				<label className='toggle-div'>
					<span>°C</span>
					<Toggle
						defaultChecked={false}
						className='toggle'
						icons={false}
						onChange={(event) => props.changeUnit(event.target.checked)}
					/>
					<span>°F</span>
				</label>
			)}
		</div>
	);
};

export default Navbar;
