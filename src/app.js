import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import { Router, Route, browserHistory, Link } from 'react-router';
import PainterMenu from './components/painterMenu.js';
import SelectedPainter from './components/selectedPainter.js';

const apiKey = "l4po77m1"
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
		name: "Pieter Paul Rubens",
		image: "src/images/Rubens.jpg"
	}
]


class App extends React.Component {

	constructor() {
		super();
		this.state= {
			paintings : []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({
			["painter"]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("submitted");
		ajax({
			url: "https://www.rijksmuseum.nl/api/en/collection/",
			data: {
	            key: apiKey,
	            format: "json",
	            imgonly: true,
	            type: "painting",
	            ps: 20,
	            q: this.state.painter
			}
		}).then((data) => {
			// console.log(data.artObjects)
			this.setState({
				paintings: data.artObjects
			})
			console.log(this.state)
		})

	}

	render() {

		return (
			<div className="wrapper">
				<h1>Color palettes</h1>
				<PainterMenu paintersList={paintersList} submitForm={this.handleSubmit} handleChange={this.handleChange}/>
				<SelectedPainter art={this.state.paintings}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));