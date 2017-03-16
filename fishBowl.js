

class App extends React.Component {
	constructor() {
		super();
		this.state={view: ""};
		this.changepage = this.changepage.bind(this)
	}
	componentDidMount() {
		this.setState({view: "bob"})
	}
	changepage() {
		this.setState({view: "anna"})
	}	
	render() {
		return this.state.view === "bob" ? 
		<div><button onClick={this.changepage}>change</button>bob</div> : 
		<div>sqlly</div>
		
	}
}