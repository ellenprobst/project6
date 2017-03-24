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
		this.showInfo = this.showInfo.bind(this);
	}

	showInfo() {
		const infoBox = document.getElementsByClassName('home__infoBox');
		infoBox[0].classList.toggle("showBox");
	}
	render() {

		return (
			<div className="wrapper home">
				<div className="innerWrapper">
					<div className="home__info" >
						<i onClick={() => this.showInfo()} className="fa fa-info-circle" aria-hidden="true"></i>
						<div className="home__infoBox">
							<p><i onClick={() => this.showInfo()} className="fa fa-times" aria-hidden="true"></i></p>
							<p>This app was created in React.js and uses AJAX to retrieve data from the Rijksmuseum API.   
							</p>
							<p>The user can choose a painter from a list of Dutch and Belgian painters. Upon selection 2 requests are made to the Rijksmuseum API which return a list of paintings and hex-values.
							</p>
							<p> These results are then used to create boxes with corresponding background-colors which the user can save to his or her account. 
							</p>
							<p><a href="http://www.ellenprobst.com">www.ellenprobst.com</a></p>
					</div>
					<UserLogin />
					</div>
					<header>
					<h1>Colors <span className="lower">from</span><span> the low countries</span></h1>
					<p>Discover the color palettes of famous Dutch and Belgian painters</p>
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