import React from 'react';
import classes from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
	return (
		<div className={classes.nav}>
			<h1>
				{title}
			</h1>
			<ul className={classes.nav__list}>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
