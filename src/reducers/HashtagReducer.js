const DEFAULT_HASHTAGS = {
	active: new Set(['timelapse']),
	inactive: new Set(['timelapseoftheday']),
};

const copyHashtagState = (state) => {
	return {
		active: new Set([...state.active]),
		inactive: new Set([...state.inactive]),
		user: state.user
	};
};

export default function(state=DEFAULT_HASHTAGS, action) {
	let newState = copyHashtagState(state);

	switch(action.type) {
			case 'HASHTAG_ADDED': {
				const newHashtag = action.payload
																	.replace('#','');
				newState.active = new Set([...newState.active, newHashtag]);
				break;
			}

			case 'HASHTAG_TOGGLED': {
				if(newState.active.has(action.payload)) {
					newState.inactive.add(action.payload);
					newState.active.delete(action.payload);
				} else {
					newState.active.add(action.payload);
					newState.inactive.delete(action.payload);
				}
				break;
			}

			default: break;
	}

	return newState;
}
