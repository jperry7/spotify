import _ from 'lodash';

const SEARCH_THROTTLE_TIME = 1000;

export function videoEnded() {
	return {
		type: 'VIDEO_ENDED'
	};
}

export function hashtagAdded(hashtag) {
	return {
		type: 'HASHTAG_ADDED',
		payload: hashtag,
	};
}

export function hashtagToggled(hashtag) {
	return {
		type: 'HASHTAG_TOGGLED',
		payload: hashtag,
	};
}

export function hashtagUser(hashtag) {
	return {
		type: 'HASHTAG_USER',
		payload: hashtag,
	};
}
