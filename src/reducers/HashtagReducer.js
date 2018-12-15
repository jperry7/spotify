import _ from 'lodash';

const DEFAULT_QUEUE_VIDEO = {
	video_url: 'Looping_Clouds.mp4'
};

const DEFAULT_HASHTAGS = {
	active: new Set(['timelapse']),
	inactive: new Set(),
	hashtagData: new Map(),
	playing: DEFAULT_QUEUE_VIDEO,
	queued: 	new Set(),
	played: 	new Set(),
	skipped: 	new Set(),
};

const copyHashtagState = (state) => {
	return {
		active: new Set([...state.active]),
		inactive: new Set([...state.inactive]),
		hashtagData: new Map(state.hashtagData),
		playing: state.playing,
		queued: 	new Set([...state.queued]),
		played: 	new Set([...state.played]),
		skipped: 	new Set([...state.skipped]),
	};
};

const getHashtagsFromCaption = (caption) => {
    const regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    let matches = [];
    let match = regex.exec(caption);
		while(match) {
			matches.push(match[1]);
			match = regex.exec(caption);
		}

    return matches;
}

const addCaptionsAndHashtags = (edge) => {
	edge.captions = edge.edge_media_to_caption
											 .edges
											 .map(edge => edge.node.text)
	edge.hashtags = new Set(_.flatten(edge.captions
																.map(caption => getHashtagsFromCaption(caption)))
	);
	return edge;
}

const updateQueue = (state) => {
	const videos = [...state.queued]
										.filter(
											video => video.video_url && video.video_url.length
										)
										.filter(
											video => !state.played.has(video.video_url)
										)
										.filter(
											video => [...state.active].every(
													hashtag => video.hashtags.has(hashtag)
												)
										)

	if(state.active.size && videos.length) {
		state.playing = videos[0];
	}
	else {
		state.playing = DEFAULT_QUEUE_VIDEO;
	}

	return state;
}

export default function(state=DEFAULT_HASHTAGS, action) {
	let newState = copyHashtagState(state);

	console.log('QUEUED VIDEOS:', newState.queued.size)

	switch(action.type) {
			case 'HASHTAG_ADDED': {
				const newHashtag = action.payload
																	.replace('#','');
				newState.active = new Set([...newState.active, newHashtag]);

				newState = updateQueue(newState);
				
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

				newState = updateQueue(newState);

				break;
			}

			case 'HASHTAG_SEARCH_RETURNED': {
				newState.hashtagData.set(action.payload.name, action.payload);

				const newVideos = action.payload
																.edge_hashtag_to_media
																.edges
																.map(edge => edge.node)
																.map(edge => addCaptionsAndHashtags(edge))
																.filter(edge => edge.is_video);
				let newQueued = [...newState.queued, ...newVideos];
				newQueued.sort((a,b) => b.taken_at_timestamp - a.taken_at_timestamp);
				newState.queued = new Set(newQueued);
				break;
			}

			case 'VIDEO_ENDED': {
				newState.played = new Set([...newState.played, newState.playing.video_url]);
				newState = updateQueue(newState);
				break;
			}

			case 'VIDEO_SEARCH_RETURNED': {
				const videoData = action.payload;

				let queued = [...newState.queued];
				queued = queued.map(video => {
					if(video.shortcode === videoData.shortcode) {
						video.video_url = videoData.video_url;
					}
					return video;
				});

				newState.queued = new Set([...queued]);

				if(newState.playing.video_url === DEFAULT_QUEUE_VIDEO.video_url) {
					newState = updateQueue(newState);
				}

				break;
			}

			default: break;
	}

	return newState;
}
