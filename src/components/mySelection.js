import React from 'react';
import UserLogin from './userLogin.js';
import Navigation from './navigation';
import { Router, Route, browserHistory, Link } from 'react-router';



export default class MySelection extends React.Component {
	constructor() {
		super();
		this.state = {
			savedItems : [],
			show: ''

		}
		this.removeItem = this.removeItem.bind(this);
		this.displayInfo = this.displayInfo.bind(this);	
	}

	componentDidMount() {
		var user = firebase.auth().currentUser;

		const dbRef = firebase.database().ref(`/users/${user.uid}`);
		dbRef.on('value', (response) => {
		     	// console.log(response.val());
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

	displayInfo(item) {
		console.log(item)
		var itemSel  = document.getElementById(`${item.key}`)
		itemSel.classList.toggle('slide')
         
	}

	render() {
		let nothingThere = '';

		
		if(this.state.savedItems.length === 0) {
			nothingThere = (
				<div>
					<p>You currently have no items saved.</p>
				</div>
			);
		}
		else  {
			nothingThere = ''
		}
		return (
			<div className="wrapper mySelection">
				<UserLogin />
				<div className="heading">
					<Navigation />
				</div>	
				<div className="mainContent">
				<h2>My color palettes</h2>
				{this.state.savedItems.map((item, i) => {
					return(
						<div key={`savedItem-${i}`} className="savedItemContainer">
							<div className="savedItem">
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
								<div className="savedItem__info" id={`${item.key}`}>
									<img src={`${item.image}`} />
									<p>{item.title}</p>
									<p>{item.name}</p>
								</div>
							</div>
							<div className="buttons">
								<button onClick={() => this.removeItem(item)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
								<button  onClick={() => this.displayInfo(item)}><i className="fa fa-caret-down" aria-hidden="true"></i>
								</button>
							</div>
						</div>

					)
				})}
				</div>
				<div>{nothingThere}</div>			
			</div>	
		)
	}
}

