import React from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';



export default class MySelection extends React.Component {
	constructor() {
		super();
		this.state = {
			
		};
		
	}

	componentDidMount() {
		const dbRef = firebase.database().ref();
   		dbRef.on('value', (response) => {
     	console.log(response.val());
   		});
	}

	render() {
		return (
		<h1>this is my selection</h1>
		)
	}
}


		