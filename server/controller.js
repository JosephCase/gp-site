'use strict';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import reducers from '../src/reducers/reducers.js';
import App from '../src/App.js';


const config = require('../config/config.js');
const routeHelper = require('./routeHelper.js');
const view = require('./view.js');
const contentService = require('./contentService.js');

exports.generateContent = () => {

	routeHelper.generateRoutes()
	.then(() => {
		contentService.generateNavigation();
		contentService.generatePages();
	})
	.catch(err => {
		console.log(err);
	})

}

exports.serveBundle = (req, res) => {

	let preloadedState = {
		activePage: {
			isFetching: false,
			path: req.path === '/' ? config.HOMEPATH : req.path,
			error: null
		},
		navigation: [],
		pages: {}
	}

	preloadedState.navigation = contentService.getNavigation();
	preloadedState.pages = contentService.getPages();

	const store = createStore(
		reducers,
		preloadedState
	)

	const html = renderToString(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	)

	console.log(store.getState().activePage);

	res.send(view.render(html, store.getState()));

}	