import _ from 'lodash';
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
	hashtagSearched,
	videoSearched,
} from '../../actions';

class Timelapse extends Component {
	componentDidMount() {
		this.props.hashtagSearched('timelapse');
	}

	componentDidUpdate() {
		this.searchVideos();
		this.searchHashtags();
	}

	searchVideos() {
		const videos = [...this.props.hashtags.queued]
			.filter(
				video => [...this.props.hashtags.active].every(
					hashtag => video.hashtags.has(hashtag)
				)
			)
			.filter(video => !video.video_url || !video.video_url.length);

		if(videos.length) {
			const randomVideo = _.sample(videos);
			this.props.videoSearched(randomVideo.shortcode);
		}
	}

	searchHashtags() {
		const hashtags = [...this.props.hashtags.active, ...this.props.hashtags.inactive];

		if(hashtags.length) {
			const hashtag = _.sample(hashtags);

			let maxID = null;
			if(this.props.hashtags.hashtagData.has(hashtag)) {
				const data = this.props.hashtags.hashtagData.get(hashtag);

				if(data.edge_hashtag_to_media.page_info.has_next_page) {
					maxID = data.edge_hashtag_to_media.page_info.end_cursor;
				}
			}
			this.props.hashtagSearched(hashtag, maxID);
		}
	}

	render() {
		return(
			<div>
				<VideoPlayer
					onEnded={this.props.videoEnded}
					hashtags={this.props.hashtags}
					hashtagSearched={this.props.hashtagSearched}
					videoSearched={this.props.videoSearched}
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
		hashtags: state.hashtags,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		videoEnded,
		hashtagAdded,
		hashtagToggled,
		hashtagUser,
		hashtagSearched,
		videoSearched,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Timelapse);
