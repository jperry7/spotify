import React, { Component } from 'react';
import './index.css';

export default class VideoInfoBar extends Component {
	constructor(props) {
		super(props);
		this.hashtagClicked = this.hashtagClicked.bind(this);
	}

	hashtagClicked(e) {
		console.log("CLICK")
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

		return [...hashtags]
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
		);
	}

	renderVideoInfo() {
		console.log(this.props.hashtags.playing);

		const { playing } = this.props.hashtags;

		if(!playing) {
			return <div></div>;
		}

		return(
			<div>
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
