import React from 'react';
var Slider = require('react-slick');
var Carousel = require('nuka-carousel');


export default class SelectedPainter extends React.Component {
	constructor() {
		super();
		
	}
	render() {
		mixins: [Carousel.ControllerMixin];
		return (
				<div className="allColors">
					<Carousel>
					{this.props.art.map((painting, i) => {
					// console.log(painting)
						return (
							<div className="paintingDetails" key={`painting-${i}`}>
								<img src={`${painting.webImage.url}`} />
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
							</div>
						)
					})
					}
					</Carousel>
				</div>
		)
	}
	
}
