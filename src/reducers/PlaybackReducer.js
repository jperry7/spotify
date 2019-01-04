const DEFAULT_PLAYBACK_STATE = {
	token: {},
	playing: {
		is_playing: false,
		progress_ms: 1,
		item: {
			name: '',
			duration_ms: 1,
		},
	},
	tracks: new Map(),
};

const copyPlaybackState = (state) => {
	return {
		token: state.token,
		playing: state.playing,
		tracks: new Map(state.tracks),
	};
}

export default function(state=DEFAULT_PLAYBACK_STATE, action) {
	let newState = copyPlaybackState(state);

	switch(action.type) {
		case 'SET_SPOTIFY_TOKEN': {
			newState.token = action.payload;
			break;
		}

		case 'REFRESH_PLAYBACK_RETURNED': {
			newState.playing = action.payload;
			break;
		}

		case 'GET_SPOTIFY_TRACK_RETURNED': {
			console.log('set',action.payload);
			newState.tracks.set(action.payload.id, action.payload);
			break;
		}

		default: break;
	}

	return newState;
}
