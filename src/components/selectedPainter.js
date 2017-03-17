import React from 'react';

export default (props) =>{
	console.log(props)
	return (
		<div className="selectedPainter">
			{props.art.map((painting, i)=> {
				return (
					<div key={`painting-${i}`} className="painting">
						<p >{painting.title}</p>
						<img src={painting.webImage.url} alt=""/>
					</div>
					
					
					)
				})
		} 
	</div>
	)
}
