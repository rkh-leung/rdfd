import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { v4 as uuid } from 'uuid'

import Message from './Message'

const cookies = new Cookies()

export default class Chatbot extends Component {
	messagesEnd
	chatInput

	constructor(props) {
		super(props)

		this.hide = this.hide.bind(this)
		this.show = this.show.bind(this)
		this._handleInputKeyPress = this._handleInputKeyPress.bind(this)

		this.state = {
			messages: [],
			showBot: true
		}

		if (cookies.get('userID') === undefined) {
			cookies.set('userID', uuid(), { path: '/' })
		}
	}

	async df_text_query(queryText) {
		let says = {
			speaks: 'me',
			message: {
				text: {
					text: queryText
				}
			}
		}

		this.setState({
			messages: [...this.state.messages, says]
		})

		const res = await axios.post('/api/df_text_query', {
			text: queryText,
			userID: cookies.get('userID')
		})
		let resMessages = res.data.fulfillmentMessages
		if (resMessages) {
			for (let i = 0; i < resMessages.length; i++) {
				let message = resMessages[i]
				says = {
					speaks: 'bot',
					message
				}
			}

			this.setState({
				messages: [...this.state.messages, says]
			})
		}
	}

	async df_event_query(event) {
		const res = await axios.post('/api/df_event_query', {
			event,
			userID: cookies.get('userID')
		})
		let resMessages = res.data.fulfillmentMessages
		if (resMessages) {
			for (let i = 0; i < resMessages.length; i++) {
				let message = resMessages[i]
				let says = {
					speaks: 'bot',
					message
				}
				this.setState({ messages: [...this.state.messages, says] })
			}
		}
	}

	componentDidMount() {
		this.df_event_query('Welcome')
	}

	componentDidUpdate() {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
		if (this.chatInput) {
			this.chatInput.focus()
		}
	}

	renderMessages(stateMessages) {
		if (stateMessages) {
			return stateMessages.map((message, i) => {
				return (
					<Message
						key={i}
						speaks={message.speaks}
						text={message.message.text.text}
					/>
				)
			})
		} else {
			return null
		}
	}

	show() {
		this.setState({ showBot: true })
	}

	hide() {
		this.setState({ showBot: false })
	}

	_handleInputKeyPress(e) {
		if (e.key === 'Enter') {
			this.df_text_query(e.target.value)
			e.target.value = ''
		}
	}

	render() {
		if (this.state.showBot) {
			return (
				<div
					style={{
						height: 400,
						width: 400,
						position: 'absolute',
						bottom: 0,
						right: 0,
						zIndex: 1000
					}}
				>
					<div>
						<nav>
							<span>Chatbot</span>
							<ul id="nav-mobile" className="right">
								<li>
									<a onClick={this.hide}>Close</a>
								</li>
							</ul>
						</nav>
					</div>
					<div
						id="chatbot"
						style={{ height: '100%', width: '100%', overflow: 'auto' }}
					>
						{this.renderMessages(this.state.messages)}
						<div
							ref={(el) => {
								this.messagesEnd = el
							}}
							style={{ float: 'left', clear: 'both' }}
						></div>
						<input
							type="text"
							onKeyPress={this._handleInputKeyPress}
							style={{
								paddingRight: '1em',
								width: '90%',
								backgroundColor: 'white',
								borderTop: '2px solid teal',
								marginBottom: 0
							}}
							placeholder="Please be gentle to this nameless bot"
						/>
					</div>
				</div>
			)
		} else {
			return (
				<div
					style={{
						height: 40,
						width: 400,
						position: 'absolute',
						bottom: 0,
						right: 0
					}}
				>
					<div>
						<nav onClick={this.show}>
							<span>Chatbot</span>
							<ul id="nav-mobile" className="right hide-on-med-and-down">
								<li>
									<a>Open</a>
								</li>
							</ul>
						</nav>
					</div>
					<div
						ref={(el) => {
							this.messagesEnd = el
						}}
						style={{ float: 'right', clear: 'both' }}
					></div>
				</div>
			)
		}
	}
}
