'use strict';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import reducers from '../src/reducers/reducers.js';
import ActivePage from '../src/containers/ActivePage.js';
import config from '../config/config.js';
import view from './view.js';
import contentService from './contentService.js';

const serveBundle = (req, res) => {

	const store = createStore(
		reducers,
		getInitialState(req.path)
	)

	const html = renderToString(
		<Provider store={store}>
			<StaticRouter>
				<ActivePage />
			</StaticRouter>
		</Provider>
	)

	res.send(view.render(html, store.getState()));

	//repopulate the content cache
	contentService.generateAll();

}

const getInitialState = reqPath => ({
	activePage: {
		isFetching: false,
		path: reqPath === '/' ? config.HOMEPATH : reqPath,
		error: null
	},
	navigation: contentService.getNavigation() || [],
	pages: contentService.getPages() || {}
})

module.exports = { serveBundle, getInitialState };