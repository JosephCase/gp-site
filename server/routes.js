'use strict';

const request = require('request');

const config = require('../config/config.js');

const routes = {};
var _routes = [];

routes.generateRoutes = () => {
 
	request.get(`${config.apiHost}/pages`, (err, api_res, body) => {
		setTimeout(function() {

			if(err || api_res.statusCode != 200) {
				return console.log(err || JSON.parse(body).message);
			}

			_routes = [];

			let pages = JSON.parse(body);
			pages.forEach( page => {

				let newRoute = createRoute(page);

				let parentName = null;
				if(page.parentPage_id) {
					parentName = getPageName(page.parentPage_id, pages);
				}

				newRoute.path = createUrl(page.name, parentName);

				_routes.push(newRoute);
			});
		}, 10000)
	})
}

routes.getRouteById = (id) => {
	let route = _routes.find((route) => {
		return route.id === id;
	});
	if(!route) return false;
	return route;
}

routes.getRouteByPath = (path) => {
	let route = _routes.find((route) => {
		return route.path === path;
	});
	if(!route) return false;
	return route;
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

module.exports = routes;