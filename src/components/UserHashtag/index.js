import React, { Component } from 'react';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusCircle)

export default class UserHashtag extends Component {

	DEFAULT_WIDTH = "200px";

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			width: this.DEFAULT_WIDTH,
		};
		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	getWidth(value) {
		const div = document.createElement("div");
		div.classList.add('hashtag');
		div.innerText = value;

		document.getElementsByClassName('UserHashtag')[0].appendChild(div);
		const width = Math.max((div.offsetWidth + 20), this.DEFAULT_WIDTH) + "px";
		document.getElementsByClassName('UserHashtag')[0].removeChild(div);

		return width;
	}

	sanitizeHashtag(value) {
		const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
									 'n','o','p','q','r','s','t','u','v','w','x','y','z'];
		const nums = 	['0','1','2','3','4','5','6','7','8','9','0'];

		if(value.length === 1 && value[0] === '#') {
			return value;
		}

		value = [...value].filter((x,i) => {
			if(chars.includes(x.toLowerCase())) {
				return true;
			}

			if(nums.includes(x) && i > 0) {
				return true;
			}

			return false;
		}).join('');

		if(value.length>0) {
			value = '#' + value;
		}

		return(value);
	}

	onChange(event) {
		this.setState({
			value: this.sanitizeHashtag(event.target.value),
			width: this.getWidth(event.target.value),
		});
	}

	onClick() {
		this.hashtagAdded();
	}

	onKeyPress(event) {
		if(event.key === 'Enter') {
			this.hashtagAdded();
		}
	}

	hashtagAdded() {
		this.props.hashtagAdded(this.state.value);
		this.setState({
			value: '',
			width: this.DEFAULT_WIDTH
		});
	}

	renderSubmitButton() {
		if(this.state.value.length > 0) {
			return <FontAwesomeIcon
								icon={['fa', 'plus-circle']}
								className="UserHashtagSubmitButton"
								onClick={this.onClick}
			/>;
		} else {
			return <span></span>
		}
	}

	render() {
		return(
			<div className='UserHashtag'>
				{this.renderSubmitButton()}
				<input
					type="search"
					className="UserHashtagInput"
					placeholder="#hashtag"
					onChange={this.onChange}
					onKeyPress={this.onKeyPress}
					style={{width: this.state.width}}
					value={this.state.value}
				/>
			</div>
		);
	}
}
