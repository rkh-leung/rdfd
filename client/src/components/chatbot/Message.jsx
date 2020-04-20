import React from 'react'

const Message = (props) => (
	<div>
		<div>
			<div>
				{props.speaks === 'bot' && (
					<div>
						<a>{props.speaks}</a>
					</div>
				)}

				<div>
					<span>{props.text}</span>
				</div>

				{props.speaks === 'me' && (
					<div>
						<a>{props.speaks}</a>
					</div>
				)}
			</div>
		</div>
	</div>
)

export default Message
