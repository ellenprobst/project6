import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';

export default function Navigation() {
	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/painters'>List of Painters</Link>
		</nav>
	)
}