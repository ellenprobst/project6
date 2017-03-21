import React from 'react';
import UserLogin from './userLogin.js';
import { Router, Route, browserHistory, Link } from 'react-router';



export default class MySelection extends React.Component {
	constructor() {
		super();
		this.state = {
			savedItems : [
				{
					title: "",
					image: "",
					colors: []
				}
			]
		}
		this.removeItem = this.removeItem.bind(this);	
	}

	componentDidMount() {
		var user = firebase.auth().currentUser;

		const dbRef = firebase.database().ref(`/users/${user.uid}`);
   		dbRef.on('value', (response) => {
     	console.log(response.val());
   		});

   		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				dbRef.on('value', (data) => {
					// console.log(data.val());

					const dataBaseData = data.val();
					const itemArray = [];
					for(let itemKey in dataBaseData) {
						const savedItem = dataBaseData[itemKey] 
						 itemArray.push(savedItem);
						 savedItem.key = itemKey;	
					}
					this.setState({
						 	savedItems: itemArray
					 })
					console.log(itemArray);
				})
			}
		});	
	}

	removeItem(itemToRemove) {
		var user = firebase.auth().currentUser;

		const dbRef = firebase.database().ref(`/users/${user.uid}/${itemToRemove.key}`)
		dbRef.remove();
	}

	render() {
		return (
			<div>
				<UserLogin />
				
				{this.state.savedItems.map((item, i) => {
					return(
						<div key={`savedItem-${i}`} className="savedItem">
							<div className="groupColor">
									{item.colors.map((color, i)=> {
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
							<img src={`${item.image}`} />
							<p>{item.title}</p>
							<button >Show info</button>
							<button onClick={() => this.removeItem(item)}>remove</button>
						</div>
					)
				})}
			</div>	
		
		)
	}
}

