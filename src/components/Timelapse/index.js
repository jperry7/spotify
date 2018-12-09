import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import VideoPlayer from '../VideoPlayer';
import HashtagBar from '../HashtagBar';

import {
	videoEnded,
	hashtagAdded,
	hashtagToggled,
	hashtagUser,
} from '../../actions';

class Timelapse extends Component {
	render() {
		return(
			<div>
				<VideoPlayer
					src={this.props.queue.playing.src}
					onEnded={this.props.videoEnded}
				/>
				<HashtagBar
					hashtags={this.props.hashtags}
					hashtagAdded={this.props.hashtagAdded}
					hashtagToggled={this.props.hashtagToggled}
					hashtagUser={this.props.hashtagUser}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		queue: state.queue,
		hashtags: state.hashtags,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		videoEnded,
		hashtagAdded,
		hashtagToggled,
		hashtagUser,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Timelapse);
