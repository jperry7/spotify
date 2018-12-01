import { combineReducers } from 'redux';
import QueueReducer from './QueueReducer';
import LogReducer from './LogReducer';

export default combineReducers({
	queue: QueueReducer,
	log: LogReducer,
});
