import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import './css/reset.css';
import './css/style.css';
import './css/landingPage.css';
import './css/header.css';
import './css/footer.css';
import './css/sectionPage.css';
import './css/workPage.css';

import { navigate, fetchState } from './actions/actions.js'
import reducers from './reducers/reducers.js'
import ActivePage from './containers/ActivePage.js'
// import registerServiceWorker from './registerServiceWorker';


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
	console.log(store.getState());
}

const history = createHistory();
const unlisten = history.listen(historyListener);

if(process.env.NODE_ENV === 'development') {
	store.dispatch(fetchState(history.location.pathname)).then(() => {
		store.getState();
	});
}

hydrate(
	<Provider store={store}>
		<Router history={history}>
        	<ActivePage />
		</Router>
	</Provider>,
	document.getElementById('root')
);




