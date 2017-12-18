import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';


import createHistory from 'history/createBrowserHistory';


import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { navigate, fetchNavigation } from './actions/actions.js'
import reducers from './reducers/reducers.js'

const HOMEPATH = '/works'

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = createStore(
	reducers,
	preloadedState,
	applyMiddleware(thunkMiddleware)
)

function historyListener(location) {
	let newPath = location.pathname === '/' ? HOMEPATH : location.pathname;
	store.dispatch(navigate(newPath));
}

const history = createHistory();
const unlisten = history.listen(historyListener);

hydrate(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
// registerServiceWorker();

