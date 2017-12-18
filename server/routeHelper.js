'use strict';

const request = require('request');
const cache = require('memory-cache');

const config = require('../config/config.js');

const routeHelper = {};

routeHelper.generateRoutes = () => {

	return new Promise((resolve, reject) => {

		request.get(`${config.apiHost}/pages`, (err, api_res, body) => {

			if(err || api_res.statusCode != 200) {
				return reject(err || JSON.parse(body).message);
			}

			let routes = [];

			let pages = JSON.parse(body);
			pages.forEach( page => {

				let newRoute = createRoute(page);

				let parentName = null;
				if(page.parentPage_id) {
					parentName = getPageName(page.parentPage_id, pages);
				}
				newRoute.path = createUrl(page.name, parentName);

				routes.push(newRoute);
			});

			cache.put('routes', routes);

			return resolve();

		})
	})
}

routeHelper.getRouteById = (id) => {
	let route = routeHelper.getAllRoutes().find((route) => {
		return route.id === id;
	});
	if(!route) return false;
	return route;
}

routeHelper.getRouteByPath = (path) => {
	let route = routeHelper.getAllRoutes().find((route) => {
		return route.path === path;
	});
	if(!route) return false;
	return route;
}

routeHelper.getAllRoutes = () => {
	return cache.get('routes');
}


function createRoute(page) {
	return {
		id: page.id,
		type: page.isParent ? config.SECTION : config.PAGE,
		apiPath: page.links.self,
		path: null
	};
}

function createUrl(pageName, sectionName) {
	let path = '/' + pageName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "");
	if(sectionName) path = '/' + sectionName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "") + path;
	return path;
}

function getPageName(id, pages) {
	let page = pages.find((page) => {
		return page.id === id;
	});
	if(!page) return false;
	return page.name;
}

module.exports = routeHelper;