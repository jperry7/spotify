import React, { Component } from 'react';
import './index.css';

export default class VideoPlayer extends Component {
	constructor(props) {
		super(props);
		this.onEnded = this.onEnded.bind(this);
	}

	onEnded(e) {
		e.target.currentTime = 0;
		e.target.play();
		this.props.onEnded();
	}

	render() {
		return(
			<video
				className="VideoPlayer"
				src={this.props.src}
				onEnded={this.onEnded}
				autoPlay={true}
				muted={true}
			/>
		);
	}
}
