import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import VideoPlayer from '../VideoPlayer';
import HashtagBar from '../HashtagBar';
import VideoInfoBar from '../VideoInfoBar';

import {
	videoEnded,
	videoSkipped,
	hashtagAdded,
	hashtagToggled,
	hashtagUser,
	hashtagSearched,
	videoSearched,
	refreshPlayback,
	getSpotifyTrack,
} from '../../actions';

class Timelapse extends Component {
	constructor(props) {
		super(props);
		this.isBeat = this.isBeat.bind(this);
		this.tick = this.tick.bind(this);
		this.getTempo = this.getTempo.bind(this);
		this.state = { beating: false };
	}

	componentDidMount() {
		this.props.hashtagSearched('timelapse');
		this.tick();
	}

	componentDidUpdate() {
		this.searchVideos();
		this.searchHashtags();
		this.refreshPlayback();
		this.getSpotifyTrack();
	}

	tick() {
		const currentTime = Date.now();
		const tempo = this.getTempo();
		const videoPlayer = document.getElementById('VideoPlayer');
		const beating = (currentTime % tempo) > (tempo / 2);

		if(beating != this.state.beating) {
			if(beating) {
				console.log('beat');
				videoPlayer.playbackRate = 1.0;
				this.setState({ beating: true });
			} else {
				videoPlayer.playbackRate = 0.0;
				this.setState({ beating: false });
			}
		}

		requestAnimationFrame(this.tick);
	}

	getTempo() {
		const {playing} = this.props.playback;
		if(playing) {
			const {item, progress_ms} = playing;
			if(item && progress_ms) {
				const {id} = item;
				if(id) {
					if(this.props.playback.tracks.has(id)) {
						const track = this.props.playback.tracks.get(id);
						return(1 / track.tempo * 60 * 1000);
					}
				}
			}
		}
		return 1;
	}

	isBeat() {
		const {playing} = this.props.playback;
		if(!playing) return false;
		const {item, progress_ms, timestamp} = playing;
		if(!item || !progress_ms) return false;

		const {id} = item;
		if(!id) return false;

		if(!this.props.playback.tracks.has(id)) return false;

		const track = this.props.playback.tracks.get(id);
		if(!track) return false;

		const beatTime = 1 / track.tempo * 60 * 1000;

		if(Date.now() % beatTime < beatTime / 2) return true;

		return false;
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
		const hashtags = [...this.props.hashtags.active];

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

	refreshPlayback() {
		if(this.props.playback.token && this.props.playback.token.length) {
			this.props.refreshPlayback(this.props.playback.token);
		}
	}

	getSpotifyTrack() {
		if(this.props.playback.token && this.props.playback.token.length) {
			if(this.props.playback.playing && this.props.playback.playing.item) {
				if(this.props.playback.playing.item.id) {
					const { id } = this.props.playback.playing.item;

					if(!this.props.playback.tracks.has(id)) {
							this.props.getSpotifyTrack(this.props.playback.token, id);
					}
				}
			}
		}
	}

	render() {
		return(
			<div>
				<VideoPlayer
					onEnded={this.props.videoEnded}
					hashtags={this.props.hashtags}
					playback={this.props.playback}
					hashtagSearched={this.props.hashtagSearched}
					videoSearched={this.props.videoSearched}
				/>
				<HashtagBar
					hashtags={this.props.hashtags}
					hashtagAdded={this.props.hashtagAdded}
					hashtagToggled={this.props.hashtagToggled}
					hashtagUser={this.props.hashtagUser}
				/>
				<VideoInfoBar
					hashtags={this.props.hashtags}
					playback={this.props.playback}
					hashtagAdded={this.props.hashtagAdded}
					hashtagToggled={this.props.hashtagToggled}
					videoSkipped={this.props.videoSkipped}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		hashtags: state.hashtags,
		playback: state.playback,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		videoEnded,
		videoSkipped,
		hashtagAdded,
		hashtagToggled,
		hashtagUser,
		hashtagSearched,
		videoSearched,
		refreshPlayback,
		getSpotifyTrack,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Timelapse);
