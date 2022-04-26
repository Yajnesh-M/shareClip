import React, { Component } from 'react'
	
class App extends Component {
constructor(props){
	super(props)
		
	// Set initial state
	this.state = {greeting :
		'Click the button to receive greetings'}
		
	
}

updateState=()=>{
	// Changing state
	this.setState({greeting :
				'yaj'})
}
	
render(){
	return (
	<div>
	<h2>Greetings Portal</h2>
	<p>{this.state.greeting}</p>
	
		{/* Set click handler */}
		<button onClick={this.updateState}>
		Click me!
		</button>
	</div>
	)
}
}
	
export default App;
