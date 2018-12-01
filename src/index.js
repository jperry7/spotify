import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import './index.css';

import Reducers from './reducers';
import Timelapse from './components/Timelapse';

import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={Timelapse} />
			<Route path="/timelapse" component={Timelapse} />
		</div>
	</Router>
);

const provider = (
	<Provider
		store={applyMiddleware(ReduxPromise)(createStore)(Reducers)}
	>
		{routing}
	</Provider>
);

ReactDOM.render(provider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
