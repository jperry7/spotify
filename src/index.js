import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

import ReduxThrottle from 'redux-throttle';
import HashtagSearch from './middleware/HashtagSearchMiddleware';
import VideoSearch from './middleware/VideoSearchMiddleware';
import RefreshPlayback from './middleware/RefreshPlaybackMiddleware';
import ReduxPromise from 'redux-promise';

import './index.css';

import Reducers from './reducers';
import Timelapse from './components/Timelapse';
import SpotifyLogin from './components/SpotifyLogin';
import SpotifyCallback from './components/SpotifyCallback';

import * as serviceWorker from './serviceWorker';

const DEFAULT_THROTTLE_WAIT = 1000;
const DEFAULT_THROTTLE_OPTIONS = {
	leading: true,
	trailing: true,
};

const routing = (
	<Router basename={'/spotify'}>
		<div>
			<Route path={'/'} component={Timelapse} />
			<Route path={'/timelapse'} component={Timelapse} />
			<Route path={'/login'} component={SpotifyLogin} />
			<Route path={'/callback'} component={SpotifyCallback} />
		</div>
	</Router>
);

const provider = (
	<Provider
		store={
						applyMiddleware(
							ReduxThrottle(DEFAULT_THROTTLE_WAIT, DEFAULT_THROTTLE_OPTIONS),
							HashtagSearch,
							VideoSearch,
							RefreshPlayback,
							ReduxPromise,
						)(createStore)(Reducers)
					}
	>
		{routing}
	</Provider>
);

ReactDOM.render(provider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
