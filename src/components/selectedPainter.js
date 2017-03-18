import React from 'react';

export default (props) =>{
	return (
		<div className="selectedPainter">
			{props.art.map((painting, i) => {
				this.setState({
						selectedPainting: painting.normalizedColors
					})
				return (
					
					<div className="paintingDetails" key={props.state.selectedPainting}>
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
						<button handleClick={props.handleClick}>View more</button>
					</div>
				)
			})} 
			<div className="paintingImage" >
				<img src="" alt=""/>Image
			</div>	
				
		</div>
	)
}
