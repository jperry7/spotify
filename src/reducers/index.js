import { combineReducers } from 'redux';
import HashtagReducer from './HashtagReducer';
import PlaybackReducer from './PlaybackReducer';
import LogReducer from './LogReducer';

export default combineReducers({
	hashtags: HashtagReducer,
	playback: PlaybackReducer,
	log: LogReducer,
});
