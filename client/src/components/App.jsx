import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Chatbot from './chatbot/Chatbot'
import Header from './landing/Header'

class App extends Component {
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<h1>Chatbot AMA</h1>
						<Chatbot />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default App
