const HASHTAG_SEARCH_THROTTLE_TIME = 5000;
const VIDEO_SEARCH_THROTTLE_TIME = 2000;
const REFRESH_PLAYBACK_THROTTLE_TIME = 1000;
const GET_SPOTIFY_TRACK_THROTTLE_TIME = 1000;

export function videoEnded({ hashtags, queue }) {
	return {
		type: 'VIDEO_ENDED',
		payload: { hashtags, queue },
	};
}

export function videoSkipped() {
	return {
		type: 'VIDEO_SKIPPED'
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

export function hashtagSearched(hashtag, maxID=null) {
	return {
		type: 'HASHTAG_SEARCHED',
		payload: { hashtag, maxID },
		meta: {
			throttle: HASHTAG_SEARCH_THROTTLE_TIME
		},
	};
}

export function videoSearched(shortcode) {
	return {
		type: 'VIDEO_SEARCHED',
		payload: {
			shortcode
		},
		meta: {
			throttle: VIDEO_SEARCH_THROTTLE_TIME
		},
	};
}

export function setSpotifyToken(token) {
	return {
		type: 'SET_SPOTIFY_TOKEN',
		payload: token,
	}
}

export function refreshPlayback(accessToken) {
	return {
		type: 'REFRESH_PLAYBACK',
		payload: {
			accessToken: accessToken
		},
		meta: {
			throttle: REFRESH_PLAYBACK_THROTTLE_TIME
		}
	}
}

export function getSpotifyTrack(accessToken, track) {
	return {
		type: 'GET_SPOTIFY_TRACK',
		payload: {
			accessToken: accessToken,
			track: track,
		},
		meta: {
			throttle: GET_SPOTIFY_TRACK_THROTTLE_TIME
		}
	}
}
