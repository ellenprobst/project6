import React from 'react';

export default (props) => {
	console.log(props)	
	return (
		<form className='painterMenu' onSubmit={props.submitForm}>
			{props.paintersList.map((painter, i) => {return(
					<div key={`painter-${i}`} className="painter">
						<input type="radio" name="painter" id={painter.name}/>
						<label htmlFor={painter.name}>{painter.name}</label>
					</div>	
				)
			})}
			<input type="submit" value="Submit form"/>
		</form>
	)
}