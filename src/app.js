import React from 'react';
import ReactDOM from 'react-dom';
import PainterMenu from './components/painterMenu.js';
import { Router, Route, browserHistory, Link } from 'react-router';

import Slider from 'react-slick';




class App extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		const settings = {
	      dots: true,
	      infinite: true,
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      fade: true,
	      adaptiveHeight: true
	    };

		return (
			<div className="wrapper">
				<header>
					<h1>Colors <span className="lower">from</span><span> the low countries</span></h1>
					<button><Link to="/painters">Start</Link></button>
				</header>
			</div>  
		)
		
	}
}



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/painters" component={PainterMenu}/>
		<Route path="/colors" component={App}/>
	</Router>, document.getElementById('app'));