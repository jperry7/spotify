import React, { Component } from 'react';
import './index.css';

import UserHashtag from '../UserHashtag';

export default class HashtagBar extends Component {
		constructor(props) {
			super(props);
			this.onClick = this.onClick.bind(this);
		}

		onClick(e) {
			const hashtag = e.target
												.textContent
												.slice(1);
			this.props.hashtagToggled(hashtag);
		}

		renderHashtags() {
			const hashtags = [...this.props.hashtags.active, ...this.props.hashtags.inactive].sort();
			return hashtags.map(
								hashtag => this.renderHashtag(hashtag, this.props.hashtags.active.has(hashtag))
			);
		}

		renderHashtag(hashtag, active) {
			const className = (active) ? 'Hashtag HashtagActive' : 'Hashtag HashtagInactive';
			return(
				<span
					className={className}
					key={hashtag}
					onClick={this.onClick}
				>
					#{hashtag}
				</span>
			);
		}

		render() {
			return(
				<div className='HashtagBar'>
					{this.renderHashtags()}
					<UserHashtag
						hashtagAdded={this.props.hashtagAdded}
					/>
				</div>
			);
		}
}
