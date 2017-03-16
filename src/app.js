import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';
import PainterMenu from './components/painterMenu.js';



const paintersInfo = [
	{
		name: "Frans Hals",
		image: "src/images/Hals.jpg"
	},
	{
		name: "Rembrandt",
		image: "src/images/Rembrandt.jpg"
	},
	{
		name: "Rubens",
		image: "src/images/Rubens.jpg"
	}
]



class App extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1>Color palettes</h1>
				<PainterMenu paintersInfo={paintersInfo}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));