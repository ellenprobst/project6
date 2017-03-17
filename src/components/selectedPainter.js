import React from 'react';

export default (props) =>{
	console.log(props)
	return (
		<div className="SelectedPainter">
		{ props.art.map((painting)=> {
			return (
				<p>{painting.title}</p>
				)
			})
		} 
	</div>
	)
}
