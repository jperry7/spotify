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
		this.props.onEnded(this.props);
	}

	render() {
		return(
			<video
				id='VideoPlayer'
				className="VideoPlayer"
				src={this.props.hashtags.playing.video_url}
				onEnded={this.onEnded}
				autoPlay={true}
				muted={true}
				playsInline={true}
			/>
		);
	}
}
