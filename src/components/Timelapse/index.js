import React, { Component } from 'react';
import './index.css';
import VideoPlayer from '../VideoPlayer';

export default class Timelapse extends Component {
	render() {
		return(
			<div>
				<VideoPlayer
					src='Looping_Clouds.mp4'
				/>
			</div>
		);
	}
}
