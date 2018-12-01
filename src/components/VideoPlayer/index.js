import React, { Component } from 'react';
import './index.css';
import uikit from 'uikit';

export default class VideoPlayer extends Component {
	render() {
		return(
			<video
				className="VideoPlayer"
				uk-video="autoplay: inview"
				src={this.props.src}
			/>
		);
	}
}
