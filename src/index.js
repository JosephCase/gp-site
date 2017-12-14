import React from 'react';
import ReactDOM from 'react-dom';
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

const store = createStore(
	reducers,
	applyMiddleware(thunkMiddleware)
)

store.dispatch(fetchNavigation());

function historyListener(location) {
	let newPath = location.pathname === '/' ? HOMEPATH : location.pathname;
	store.dispatch(navigate(newPath)).then(() => {
		console.log(store.getState());
	});	
}

const history = createHistory();

const unlisten = history.listen(historyListener)
historyListener(history.location)


ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
// registerServiceWorker();

