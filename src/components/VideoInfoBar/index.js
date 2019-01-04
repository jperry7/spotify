import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import './index.css';

export default class VideoInfoBar extends Component {
	constructor(props) {
		super(props);
		this.hashtagClicked = this.hashtagClicked.bind(this);
		this.videoSkipped = this.videoSkipped.bind(this);
		this.ownerClicked = this.ownerClicked.bind(this);
	}

	hashtagClicked(e) {
		const hashtag = e.target
											.textContent
											.slice(1);
		if(this.props.hashtags.active.has(hashtag) || this.props.hashtags.inactive.has(hashtag)) {
			this.props.hashtagToggled(hashtag);
		} else {
			this.props.hashtagAdded(hashtag);
		}
	}

	videoSkipped() {
		this.props.videoSkipped();
	}

	renderHashtags(hashtags) {
		if(!hashtags) return <span></span>;

		return(
			<div>
				{[...hashtags]
					.sort()
					.map(
								hashtag => <span
														key={'hashtag-' + hashtag}
														className={
																				(this.props.hashtags.active.has(hashtag)) ?
																					'VideoInfoHashtag VideoInfoHashtagActive' :
																					'VideoInfoHashtag VideoInfoHashtagInactive'
																			}
														onClick={this.hashtagClicked}
													 >
															#{hashtag}
													 </span>
				)}
			</div>
		);
	}

	ownerClicked(e) {
		const url = `https://www.instagram.com/${this.props.hashtags.playing.owner.username}/`;
		window.open(url,'_blank');
	}

	renderOwner(owner) {
		if(!owner) return <div></div>;

		return <div
						onClick={this.ownerClicked}
						className='VideoInfoOwner'
					 >
							@{owner.username}
					 </div>;
	}

	renderLocation(location) {
		if(!location || !location.name || !location.name.length) {
			return <span className='VideoInfoLocation'>Unknown Location</span>;
		}

		return <span className='VideoInfoLocation'>{location.name}</span>;
	}

	renderTime(timestamp) {
		if(!timestamp) return <span></span>;

		return(
						<span className='VideoInfoTime'>
							<Moment unix fromNow>
								{timestamp}
							</Moment>
						</span>
		);
	}

	renderSpotifyLoginLink() {
		return <div>
						<Link to='/login'>
							<button>
								Connect to Spotify
							</button>
						</Link>
					</div>;
	}

	renderSpotifyTrackName() {
		if(!this.props.playback.playing.item || !this.props.playback.playing.item.name) {
			return <span></span>;
		}

		return <span>
			{this.props.playback.playing.item.name}
		</span>
	}

	renderSpotifyAlbumName() {
		if(!this.props.playback.playing.item || !this.props.playback.playing.item.album || !this.props.playback.playing.item.album.name) {
			return <span></span>;
		}

		return <span>
			{this.props.playback.playing.item.album.name}
		</span>
	}

	renderSpotifyArtistName() {
		if(!this.props.playback.playing.item || !this.props.playback.playing.item.artists || !this.props.playback.playing.item.artists[0] || !this.props.playback.playing.item.artists[0]) {
			return <span></span>;
		}

		return <span>
			{this.props.playback.playing.item.artists[0].name}
		</span>
	}

	renderSpotifyTrackProgress() {
		if(!this.props.playback.playing || !this.props.playback.playing.item) {
			return <span></span>;
		}

		const { progress_ms }  	= this.props.playback.playing;
		const { duration_ms } 	= this.props.playback.playing.item;
		const progress = Math.round(progress_ms / duration_ms * 100);
		return <span>
			({progress}%)
		</span>
	}

	renderSpotifyTempo() {
		if(!this.props.playback.playing || !this.props.playback.playing.item || !this.props.playback.playing.item.id) {
			return <span></span>
		}

		const {id} = this.props.playback.playing.item;

		if(!this.props.playback.tracks.has(id)) {
			return <span></span>
		}

		const track = this.props.playback.tracks.get(id);

		if(track.tempo) {
			return <span>{Math.round(track.tempo)} beats/min, {Math.round(track.danceability * 100)}% danceability</span>
		}
	}

	renderSpotify() {
		if(!this.props.playback.token || !this.props.playback.token.length) {
			return this.renderSpotifyLoginLink();
		}
		else {
			if(this.props.playback.playing && this.props.playback.playing.is_playing) {
				return <div>
									<div className='SpotifyAlbum'>{this.renderSpotifyArtistName()} - {this.renderSpotifyAlbumName()} - {this.renderSpotifyTrackName()} {this.renderSpotifyTrackProgress()}</div>
									<div className='SpotifyTempo'>{this.renderSpotifyTempo()}</div>
							 </div>;
			}
			else {
				return <div className='SpotifyTrackName'>No song is currently playing.</div>;
			}
		}
	}

	renderSkip() {
		if(!this.props.hashtags.playing.owner) {
			return <span></span>;
		}

		return <div className='Skip'>
							<button
								onClick={this.videoSkipped}
							>
								Skip Video
							</button>
		</div>;
	}

	renderVideoInfo() {
		const { playing } = this.props.hashtags;

		if(!playing) {
			return <div></div>;
		}

		return(
			<div>
				{this.renderOwner(playing.owner)}
				{this.renderLocation(playing.location)} {this.renderTime(playing.taken_at_timestamp)}
				{this.renderHashtags(playing.hashtags)}
				{this.renderSkip()}
				<hr />
				{this.renderSpotify()}
				<br />
				<div className='Author'>
					<a href='https://perry.sh'>APP BY JOSHUA PERRY</a>
				</div>
			</div>
		);
	}

	render() {
		return(
			<div className='VideoInfoBar'>
				{this.renderVideoInfo()}
			</div>
		);
	}
}
