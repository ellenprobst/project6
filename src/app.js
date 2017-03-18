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
			paintings : [],
			selectedPainting: []
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(e) {
		this.setState({
			["painter"]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		// console.log("submitted");
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
			let paintings = data.artObjects
			// console.log(paintings)
			
			paintings.forEach((painting) => {
				let object = painting.objectNumber
				ajax({
					url: `https://www.rijksmuseum.nl/api/en/collection/${object}`,
					data: {
			            key: apiKey,
			            format: "json",
			            imgonly: true,
			            type: "painting",
			            ps: 20,
			            q: this.state.painter
			           }
				}).then((paintingData) => {
					let artObject = paintingData.artObject
					if (artObject.normalizedColors.length != 0 ) {
						console.log(artObject)
						let selectedPaintings = this.state.paintings

						selectedPaintings.push(artObject)
						// console.log(selectedPaintings)

						this.setState({
							paintings: selectedPaintings
						})
					}
				})
			}) 	
		})

// do first ajax call, .then run for loop with inside the second ajax call and set.state
	}

	handleClick(){

	}

	render() {

		return (
			<div className="wrapper">
				<h1>Color palettes</h1>
				<PainterMenu paintersList={paintersList} submitForm={this.handleSubmit} handleChange={this.handleChange}/>
				<SelectedPainter art={this.state.paintings} handleClick={this.handleClick} selection={this.state.selectedPainting}/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));