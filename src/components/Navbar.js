import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import Toggle from "react-toggle";
import logo from "../assets/img/logo.svg";
import { useBookmarkContext } from "../helpers/context/bookmark";

const NavBar = (props) => {
	const location = useLocation();

	const [, toggleBookmarkModal] = useBookmarkContext();

	return (
		<Navbar bg="navbar" expand="lg" variant='dark'>
			<Container>
				<Navbar.Brand href="/">
					<img className='logo' src={logo} alt='Weather Hub Logo'></img>
					Weather Hub
				</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">
							<div className='nav-item'>
								Home
							</div>
						</Nav.Link>
						<Nav.Link href="/trip-planner">
							<div className='nav-item'>
								Trip Planner
							</div>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				{location.pathname !== '/trip-planner' && (
					<Navbar.Collapse className="justify-content-end">
						<Nav>
							<Nav.Link
								href="#"
								onClick={(e) => {
									e.preventDefault();
									toggleBookmarkModal();
								}}
							>
								<div className='nav-item'>
									Bookmarks
								</div>
							</Nav.Link>
							<Navbar.Text>
								<label className='toggle-div nav-item'>
									<span>°C  </span>
									<Toggle
										defaultChecked={false}
										className='toggle'
										icons={false}
										onChange={(event) => props.changeUnit(event.target.checked)}
									/>
									<span>  °F</span>
								</label>
							</Navbar.Text>
						</Nav>
					</Navbar.Collapse>
				)}
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
			</Container>
		</Navbar >
	);
};

export default NavBar;
