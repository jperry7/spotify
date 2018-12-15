import React, { Component } from 'react';
import './index.css';

export default class VideoInfoBar extends Component {
	constructor(props) {
		super(props);
		this.hashtagClicked = this.hashtagClicked.bind(this);
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
			return <div className='VideoInfoLocation'>Location Unknown</div>;
		}

		return <div className='VideoInfoLocation'>{location.name}</div>;
	}

	renderVideoInfo() {
		console.log(this.props.hashtags.playing);

		const { playing } = this.props.hashtags;

		if(!playing) {
			return <div></div>;
		}

		return(
			<div>
				{this.renderOwner(playing.owner)}
				{this.renderLocation(playing.location)}
				{this.renderHashtags(playing.hashtags)}
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
