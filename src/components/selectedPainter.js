import React from 'react';
import { ajax } from 'jquery';
import Navigation from './navigation';
import { Router, Route, browserHistory, Link } from 'react-router';
import UserLogin from './userLogin.js';
var Slider = require('react-slick');
var Carousel = require('nuka-carousel');

const apiKey = "l4po77m1"

export default class SelectedPainter extends React.Component {
	constructor() {
		super();
		this.state= {
			paintings: [],
			view : ""
		}

		this.handleClick = this.handleClick.bind(this);
		this.hide = this.hide.bind(this);
		
	}

	handleClick(painting) {
		if(firebase.auth().currentUser != null) {
		const user = firebase.auth().currentUser;
		const dbRef = firebase.database().ref(`/users/${user.uid}`);
		
		const selectedPainting = {
			name: painting.principalMaker,
			title: painting.title,
			image: painting.webImage.url,
			colors: painting.normalizedColors,
			id: painting.id
		};

		dbRef.push(selectedPainting);
		}
		else {
			this.setState({mustLogin: true})
		}	
	}
	
	hide() {
		this.setState({mustLogin: false})
	}

	componentDidMount() {
		ajax({
			url: "https://www.rijksmuseum.nl/api/en/collection/",
			data: {
	            key: apiKey,
	            format: "json",
	            imgonly: true,
	            type: "painting",
	            ps: 20,
	            q: this.props.params.painter_name
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
			            ps: 20
			           }
				}).then((paintingData) => {
					let artObject = paintingData.artObject
					if ((artObject.normalizedColors.length != 0 ) && (artObject.principalMaker === this.props.params.painter_name)) {
						let selectedPaintings = this.state.paintings

						selectedPaintings.push(artObject)

						this.setState({
							paintings: selectedPaintings
						})
					}
				})
			}) 	
		})
	}
	render() {
		return (
			<div className="wrapper">
				<UserLogin />
				<div className="heading">
					<Navigation />
				</div>
				<h2>{this.props.params.painter_name}</h2>
				<div className="allColors">
					<Carousel>
					{this.state.paintings.map((painting, i) => {
					// console.log(painting)
						return (
							<div className="paintingDetails" key={`painting-${i}`}>
								<img src={`${painting.webImage.url}`} />
								<p>{painting.title}</p>
								<div className="groupColor">
									{painting.normalizedColors.map((color, i)=> {
										let divStyle = {
											backgroundColor: color
										}
										return (
											<div style={divStyle} key={`color-${i}`} className="colors">
												<p>{color}</p>
											</div>
										)
									})}
								</div>
								<button className="saveSelection" onClick={() => this.handleClick(painting)}>Save</button>
							</div>
						)
					})
					}
					</Carousel>
				</div>

				{this.state.mustLogin === true ? <div className="mustLogin overlay" id="mustLogin"><div className="mustLogin__content"><i className="fa fa-times" aria-hidden="true" onClick={()=> this.hide()}></i><p>Please login or sign up to continue</p><UserLogin /></div></div>
					: null
				}
			</div>
		)
	}
	
}
