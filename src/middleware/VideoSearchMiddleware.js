import Axios from 'axios';

const VideoSearchMiddleware = store => next => action => {
	switch(action.type) {
		case 'VIDEO_SEARCHED': {
			const url = `https://www.instagram.com/p/${action.payload.shortcode}/?__a=1`;

			Axios.get(url)
						.then(
							response => {
								if(response.status === 200) {
									action.type = 'VIDEO_SEARCH_RETURNED';
									action.payload = response.data.graphql.shortcode_media;
									store.dispatch(action);
								}
							}
						)
						.catch(err => store.dispatch({
									type: 'VIDEO_SEARCH_ERRORED',
									payload: err,
							})
						)
		}
		break;

		default: return next(action);
	}
}

export default VideoSearchMiddleware;
