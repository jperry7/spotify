import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
import HashtagReducer from './HashtagReducer';
import LogReducer from './LogReducer';

export default combineReducers({
	queue: QueueReducer,
	hashtags: HashtagReducer,
	log: LogReducer,
});
