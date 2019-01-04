import Spotify from 'spotify-web-api-node';

const RefreshPlaybackMiddleware = store => next => action => {
	const SPOTIFY_CLIENT_ID = '7c5c8668957b4b629aa5fc99e70bb4ea';
	switch(action.type) {
		case 'REFRESH_PLAYBACK': {
			let spotifyApi = new Spotify({
				clientId: SPOTIFY_CLIENT_ID,
				accessToken: action.payload.accessToken,
			});

			spotifyApi.getMyCurrentPlaybackState({})
			  .then(data => {
					store.dispatch({
						type: 'REFRESH_PLAYBACK_RETURNED',
						payload: data.body,
					});
			  });

			break;
		}

		case 'GET_SPOTIFY_TRACK': {
			let spotifyApi = new Spotify({
				clientId: SPOTIFY_CLIENT_ID,
				accessToken: action.payload.accessToken,
			});

			spotifyApi.getAudioFeaturesForTrack(action.payload.track)
				.then(data => {
					console.log(data);
					store.dispatch({
						type: 'GET_SPOTIFY_TRACK_RETURNED',
						payload: data.body,
					})
				});

			break;
		}

		default: return next(action);
	}
}

export default RefreshPlaybackMiddleware;
