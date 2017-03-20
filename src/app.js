import React from 'react';
import ReactDOM from 'react-dom';
import PainterMenu from './components/painterMenu.js';

import Slider from 'react-slick';


const paintersList = [
	{
		name: "Frans Hals",
		image: "src/images/Hals.jpg"
	},
	{
		name: "Rembrandt van Rijn",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Johannes Vermeer",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Caesar Boëtius van Everdingen",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Jan Havicksz. Steen",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "George Hendrik Breitner",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Jan van Scorel",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Jan Willem Pieneman",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Hendrick Avercamp",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Jan Asselijn",
		image: "src/images/Rembrandt.jpg"
	},
	{	
		name: "Pieter Paul Rubens",
		image: "src/images/Rubens.jpg"
	}
]


class App extends React.Component {
	constructor() {
		super();
		this.state= {
			view : "home"
		}
	
		this.changePage = this.changePage.bind(this);
		
	}

	changePage() {
		this.setState({
			view : "paintersList"
		})
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
			this.state.view === "home" ?
			<div className="wrapper">
				<header>
					<h1>Colors <span className="lower">from</span><span> the low countries</span></h1>
					<button onClick={this.changePage}>Start</button>
				</header>
			</div> : 
			<div className="wrapper__menu">	
				<PainterMenu paintersList={paintersList}  />
			</div>	
		)
		
	}
}



ReactDOM.render(<App />, document.getElementById('app'));