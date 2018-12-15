import { combineReducers } from 'redux';
import HashtagReducer from './HashtagReducer';
import LogReducer from './LogReducer';

export default combineReducers({
	hashtags: HashtagReducer,
	log: LogReducer,
});
