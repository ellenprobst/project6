import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';

export default function Navigation() {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/painters'>Painters</Link>
			<Link to='/mySelection'>My Colors</Link>
		</nav>
	)
}