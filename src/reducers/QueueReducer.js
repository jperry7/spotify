const DEFAULT_QUEUE_VIDEO = {
	src: 'Looping_Clouds.mp4'
};

const DEFAULT_QUEUE_REDUCER_STATE = {
	playing: DEFAULT_QUEUE_VIDEO,
	queued: new Set(),
	played: new Set(),
	skipped: new Set(),
};

const copyQueueState = (state) => {
	return {
		playing: state.playing,
		queued: new Set([...state.queued]),
		played: new Set([...state.played]),
		skipped: new Set([...state.skipped]),
	};
};

export default function(state=DEFAULT_QUEUE_REDUCER_STATE, action) {
	let newState = copyQueueState(state);

	switch(action.type) {
		case 'VIDEO_ENDED': {
			if(newState.played.size === 0) {
				newState.playing = DEFAULT_QUEUE_VIDEO
			} else {
				newState.played = new Set([...newState.played, newState.playing]);
				newState.playing = [...newState.queued][0];
				newState.queued.delete(newState.playing);
			}

			return newState;
		}

		default: return state;
	}
}
