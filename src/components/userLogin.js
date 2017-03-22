import React from 'react';


export default class UserLogin extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: '',
			class: '',
			userLog: 'loggedOut'
		};
		this.formToShow = this.formToShow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.login = this.login.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.logOut = this.logOut.bind(this);

		firebase.auth().onAuthStateChanged((user) => {
			this.setState({userLog: "loggedIn"})
		});

	}

	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className,
			class: 'show'
		})
	}
	
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	signUp(e) {
		e.preventDefault();
		if(this.state.password === this.state.confirm) {
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
				.then((userData) => {
					console.log(userData)
				})
		}
		this.setState({ userLog: 'loggedIn'})
	}

	login(e) {
		e.preventDefault();
		firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then((userData) => {
				console.log(userData)
			})
		this.setState({ userLog: 'loggedIn'})
	}

	hideForm() {
		this.setState({ class: 'hide' });
		const hideIt = document.getElementById('mustLogin');
		hideIt.classList.add('hide');
	}

	logOut(e) {
		e.preventDefault();
		firebase.auth().signOut();
		this.setState({ userLog: 'loggedOut'})
	}

	
	render() {

		let loginForm = '';
		if(this.state.formToShow === 'signup') {
			loginForm = (
				<div className={`overlay ${this.state.class}`}>
					<form onSubmit={this.signUp} className={`user-form ${this.state.class}`}>
						<i className="fa fa-times" aria-hidden="true" onClick={this.hideForm}></i>
						<p>Create an account to save your favourite color palettes!</p>
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" onChange={this.handleChange} />
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" onChange={this.handleChange} />
						<label htmlFor="confirm">Confirm Password:</label>
						<input type="password" name="confirm" onChange={this.handleChange} />
						<button onClick={this.hideForm}>Sign In</button>
					</form>
				</div>
			);
		}
		else if(this.state.formToShow === "login") {
			loginForm = (
				<div className={`overlay ${this.state.class}`}>
					<form onSubmit={this.login} className={`user-form ${this.state.class}`}>
						<i className="fa fa-times" aria-hidden="true" onClick={this.hideForm}></i>
						<label htmlFor="email">Email: </label>
						<input type="email" name="email" onChange={this.handleChange}/>
						<label htmlFor="password">Password: </label>
						<input type="password" name="password" onChange={this.handleChange}/>
						<button onClick={this.hideForm}>Log In</button>
					</form>
				</div>
			);
		}

		let userAccount = '';
		if(firebase.auth().currentUser != null) {
			userAccount = (
				<div>
					<a className="logout" onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i>Log out</a>
				</div>
			);
		}
		else if (firebase.auth().currentUser === null) {
			userAccount = (
				<nav>
					<ul>
						<li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
						<li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
					</ul>
				</nav>
			);
		}
		return (

			<div className="create-user">
				{userAccount}
				{loginForm}	
			</div>
		)
	}
}


	