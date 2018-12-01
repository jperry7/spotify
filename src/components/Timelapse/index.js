import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import VideoPlayer from '../VideoPlayer';

import { videoEnded } from '../../actions';

class Timelapse extends Component {
	render() {
		return(
			<div>
				<VideoPlayer
					src={this.props.queue.playing.src}
					onEnded={this.props.videoEnded}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		queue: state.queue,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		videoEnded,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Timelapse);
