'use strict';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import reducers from '../src/reducers/reducers.js';
import ActivePage from '../src/containers/ActivePage.js';


const config = require('../config/config.js');
const routeHelper = require('./routeHelper.js');
const view = require('./view.js');
const contentService = require('./contentService.js');

exports.serveBundle = (req, res) => {

	const store = createStore(
		reducers,
		getInitialState(req.path)
	)

	const html = renderToString(
		<Provider store={store}>
			<Router>
				<ActivePage />
			</Router>
		</Provider>
	)

	console.log(store.getState().activePage);

	res.send(view.render(html, store.getState()));

	//repopulate the content cache
	contentService.generateAll();

}

function getInitialState(reqPath) {
	let preloadedState = {
		activePage: {
			isFetching: false,
			path: reqPath === '/' ? config.HOMEPATH : reqPath,
			error: null
		},
		navigation: [],
		pages: {}
	}

	preloadedState.navigation = contentService.getNavigation();
	preloadedState.pages = contentService.getPages();

	return preloadedState;
}	

exports.getInitialState = getInitialState;