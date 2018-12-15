import Axios from 'axios';

const HashtagSearchMiddleware = store => next => action => {
	switch(action.type) {
		case 'HASHTAG_SEARCHED': {
			const hashtag = action.payload.hashtag
														.replace('#','');

			const maxID = action.payload.maxID;

			let url = `https://www.instagram.com/explore/tags/${hashtag}/?__a=1`;

			if(maxID) {
				url = `${url}&max_id=${maxID}`;
			}

			Axios.get(url)
						.then(
							response => {
								if(response.status === 200) {
									const hashtagData = response.data
																					.graphql
																					.hashtag;
									store.dispatch({
											type: 'HASHTAG_SEARCH_RETURNED',
											payload: hashtagData,
									});
								}
							}
						)
						.catch(err => store.dispatch({
									type: 'HASHTAG_SEARCH_ERRORED',
									payload: err,
							})
						);
		}
		break;

		default: return next(action);
	}
}

export default HashtagSearchMiddleware;
