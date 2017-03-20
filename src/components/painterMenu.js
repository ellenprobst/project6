import React from 'react';
import paintersList from './data.js';
import Navigation from './navigation';
import SelectedPainter from './selectedPainter.js';
import { Router, Route, browserHistory, Link } from 'react-router';

export default class PainterMenu extends React.Component {
	constructor() {
		super();
		this.state= {
			paintings: [],
			view : ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}

	handleSubmit(e) {
		e.preventDefault();
		browserHistory.push(`/painter/${e.target.value}`);
		
		this.setState({
			view : "colors"
		})
		
	}
	render() {
		return (
			<div className="wrapper">
				<div className="heading">
					<Navigation />
				</div>
				<div className="mainContent">
					
					<h2>Select a painter</h2>
					<form className='painterMenu'  >
						{paintersList.map((painter, i) => {
							return(
								<div key={`painter-${i}`} className="painter">
									<input type="radio" name="painter" id={painter.name} value={painter.name}  onClick={this.handleSubmit}/>
									<label htmlFor={painter.name}>{painter.name}</label>
								</div>	
							)
						})}
					</form> 
					<div className="mainContent">
					
					</div>
				</div>
			</div>	
		)
	}
}