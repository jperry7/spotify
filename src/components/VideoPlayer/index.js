import React, { Component } from 'react';
import './index.css';
import uikit from 'uikit';

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
				uk-video="autoplay: inview"
				src={this.props.src}
				onEnded={this.onEnded}
			/>
		);
	}
}
