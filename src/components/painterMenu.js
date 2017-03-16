import React from 'react';

export default ({ paintersInfo }) => {
	return (
		<div className='painterMenu'>
			{paintersInfo.map((painter, i) => {return(
					<div key={`painter-${i}`} className="painter">
						<h2>{painter.name}</h2>
						<img src={painter.image}/>
					</div>	
				)
			})}
		</div>
	)
}