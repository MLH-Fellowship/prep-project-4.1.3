import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Toggle from 'react-toggle';
import logo from '../assets/img/logo.svg';

const NavBar = (props) => {
	const location = useLocation();
	return (
		<Navbar bg="navbar" expand="lg" variant='dark'>
			<Container>
				<Navbar.Brand href="/">
					<img className='logo' src={logo} alt='Weather Hub Logo'></img>
					Weather Hub
				</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/" className='nav-item'>Home</Nav.Link>
						<Nav.Link href="/trip-planner" className='nav-item'>Trip Planner</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
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
					</Navbar.Text>
				</Navbar.Collapse>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</Container>
		</Navbar>
	);
};

export default NavBar;
