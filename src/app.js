import React from 'react';
import ReactDOM from 'react-dom';
import PainterMenu from './components/painterMenu.js';
import SelectedPainter from './components/selectedPainter.js';
import { Router, Route, browserHistory, Link } from 'react-router';
import UserLogin from './components/userLogin.js';
import MySelection from './components/mySelection.js'; 

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
			<div className="wrapper home">
				<div className="innerWrapper">
					<UserLogin />
					<header>
					<h1>Colors <span className="lower">from</span><span> the low countries</span></h1>
					<button><Link to="/painters">Start</Link></button>
					</header>
				</div>
				<footer><p>Made by <a href="https://twitter.com/EllenProbst_">Ellen Probst</a> || illustration by <a href="https://freepik.com">FreePik</a> || data by <a href="https://www.rijksmuseum.nl/">The Rijksmuseum</a></p></footer>
			</div>  
		)
		
	}
}



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}/>
		<Route path="/painters" component={PainterMenu}/>
		<Route path="/painter/:painter_name" component={SelectedPainter}/>
		<Route path="/mySelection" component={MySelection} />
	</Router>, document.getElementById('app'));