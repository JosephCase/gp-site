'use strict';

const request = require('request');
const cache = require('memory-cache');

const config = require('../config/config.js');

const routeHelper = {};

routeHelper.generateRoutes = () => new Promise((resolve, reject) => {

	request.get(`${config.apiHost}/pages`, (err, api_res, body) => {

		if (err || api_res.statusCode != 200) {
			return reject(err || JSON.parse(body).message);
		}

		const pages = JSON.parse(body);
		const routes = pages.map(page => createRoute(page, pages));

		cache.put('routes', routes);

		return resolve();

	})
})


routeHelper.getRouteById = id => {
	const route = routeHelper.getAllRoutes().find(route => route.id === id);
	if (!route) return false;
	return route;
}

routeHelper.getRouteByPath = path => {
	const route = routeHelper.getAllRoutes().find(route => route.path === path);
	if (!route) return false;
	return route;
}

routeHelper.getAllRoutes = () => cache.get('routes');

const createRoute = (page, pages) => {

	const { parentPage_id } = page;

	const parentName = parentPage_id ? pages.find(page => page.id === parentPage_id).name : null;

	return {
		id: page.id,
		type: page.isParent ? config.SECTION : config.PAGE,
		apiPath: page.links.self,
		path: createUrl(page.name, parentName)
	};
}

const createUrl = (pageName, sectionName) => {
	let path = '/' + pageName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "");
	if (sectionName) path = '/' + sectionName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "") + path;
	return path;
}

module.exports = routeHelper;