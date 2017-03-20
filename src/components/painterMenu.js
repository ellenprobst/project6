import React from 'react';
import SelectedPainter from './selectedPainter.js';
import { ajax } from 'jquery';

const apiKey = "l4po77m1"

export default class PainterMenu extends React.Component {
	constructor() {
		super();
		this.state= {
			paintings: [],
			view : ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	handleChange(e) {
		console.log("changed")
		console.log(this)
		console.log(this.state)
		this.setState({
			["painter"]: e.target.value
		});
		console.log(this)
		console.log(this.state)
		
	}
	handleSubmit(e) {
		e.preventDefault();

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
						let selectedPaintings = this.state.paintings

						selectedPaintings.push(artObject)

						this.setState({
							paintings: selectedPaintings
						})
					}
				})
			}) 	
		})
		this.setState({
			view : "colors"
		})
		
	}
	render() {
		return (
				<div className="mainContent">
					<h2>Select a painter</h2>
					<form className='painterMenu'  >
						{this.props.paintersList.map((painter, i) => {
							return(
								<div key={`painter-${i}`} className="painter">
									<input type="radio" name="painter" id={painter.name} value={painter.name} onChange={this.handleChange} onClick={this.handleSubmit}/>
									<label htmlFor={painter.name}>{painter.name}</label>
								</div>	
							)
						})}
					</form> 
					<div className="mainContent">
					<SelectedPainter art={this.state.paintings} />
					</div>
				</div>
				
		)
	}
}