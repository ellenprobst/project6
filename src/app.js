import React from 'react';
import ReactDOM from 'react-dom';
import PainterMenu from './components/painterMenu.js';
import SelectedPainter from './components/selectedPainter.js';
import { Router, Route, browserHistory, Link } from 'react-router';
import UserLogin from './components/userLogin.js';

var config = {
    apiKey: "AIzaSyD2YfDIWZPq0g7SiX8FDKPulMf_Z6GO_7c",
    authDomain: "colors-rijksmuseum.firebaseapp.com",
    databaseURL: "https://colors-rijksmuseum.firebaseio.com",
    storageBucket: "colors-rijksmuseum.appspot.com",
    messagingSenderId: "218169873941"
  };
  firebase.initializeApp(config);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			 createEmail: '',
	      createPassword: ''
		};
	}
	render() {

		return (
			<div className="wrapper">
				<UserLogin />
				<header>
				<h1>Colors <span className="lower">from</span><span> the low countries</span></h1>
				<button><Link to="/painters">Start</Link></button>
				</header>
			</div>  
		)
		
	}
}



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/painters" component={PainterMenu}/>
		<Route path="/painter/:painter_name" component={SelectedPainter}/>
	</Router>, document.getElementById('app'));