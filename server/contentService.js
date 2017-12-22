'use strict';

const request = require('request');
const cache = require('memory-cache');

const config = require('../config/config.js');
const routeHelper = require('./routeHelper.js');

var pages = {};
var isUpdating = false;

exports.generateAll = () => {

    if(isUpdating) return;
    console.log('START');
    isUpdating = true;
    routeHelper.generateRoutes()
    .then(() => {
        return Promise.all([
            generateNavigation(),
            generatePages()
        ]);
    })
    .then(() => {
        isUpdating = false;
        console.log('FINISH');
    })
    .catch(err => {
        console.log(err);
    })

}

exports.getNavigation = () => {
    return cache.get('navigation');
}

exports.getPages = () => {
	return cache.get('pages');
}


function generateNavigation() {

    return new Promise((resolve, reject) => {        
        request.get(`${config.apiHost}/navigation`, (err, api_res, body) => {
            if(err) {
                reject(`Could not get navigation from API, ${err}`);
                return;
            }

            let navigation = JSON.parse(body);
            navigation.forEach( link => {
                link.path = routeHelper.getRouteById(link.id).path;
            })

            cache.put('navigation', navigation)

            return resolve();

        });
    })
}

function generatePages() {

    let promises = [];

    let routes = routeHelper.getAllRoutes();
    routes.forEach( route => {
        promises.push(getPageContent(route));
    });

    return Promise.all(promises)
    .then(() => {
        cache.put('pages', pages);
        pages = {};
        isUpdating = false;
    })
}


function getPageContent(route) {

    if(route.type === config.PAGE) {
        return getPage(route.apiPath).then( page => {
            pages[route.path] = page;
        })
    } else if (route.type === config.SECTION) {
        return getSection(route.apiPath).then( page => {
            pages[route.path] = page;
        })
    } else {
       	return Promise.rejected(`Unrecognised page type, ${route}`);
    }

}


function getPage(apiPath) {

    return new Promise((resolve, reject) => {

        let reqPath = `${config.apiHost}${apiPath}?embed=content`;
        request.get(reqPath, (err, api_res, body) => {
            if(err) {
                console.log(`Could not get content from API, ${err}`);
                return reject();
            }
            let page = JSON.parse(body);
            page.type = config.PAGE;
            return resolve(page);
        });
    })
}

function getSection(apiPath) {

    return new Promise((resolve, reject) => {

        let reqPath = `${config.apiHost}${apiPath}?embed=pages&visible=true`;
        request.get(reqPath, (err, api_res, body) => {
            if(err) {
                console.log(`Could not get content from API, ${err}`);
                return reject();
            }

            let section = JSON.parse(body);
            section.type = config.SECTION;
            section.pages.forEach( page => {
                page.path = routeHelper.getRouteById(page.id).path;
            })

            return resolve(section);
        });
    })
}













// const routes = {};
// var _routes = [];
// var _pages = {};

// routes.generateRoutes = () => {
 
// 	rp.get(`${config.apiHost}/pages`)
// 	.then( res => {

// 		console.log('hello');

// 		var getContentPromises = [];

// 		let pages = JSON.parse(res);
// 		pages.forEach( page => {

// 			let newRoute = createRoute(page);

// 			let parentName = null;
// 			if(page.parentPage_id) {
// 				parentName = getPageName(page.parentPage_id, pages);
// 			}

// 			newRoute.path = createUrl(page.name, parentName);

// 			_routes.push(newRoute);

// 			getContentPromises.push(getContent(newRoute));


// 		});

// 		Promise.all(getContentPromises)
// 		.then(results => {
// 			cache.put('pages', _pages);
// 			_pages = {};
// 			console.log('ROUTES READY', _pages);
// 		})


// 	})
// 	.catch(err => {
// 		return console.log(err);
// 	})
// }

// function getContent(route) {
// 	if(route.type === config.PAGE) {
// 		return (
// 			rp.get(`${config.apiHost}${route.apiPath}?embed=content`)
// 			.then( res => {
// 	            let page = JSON.parse(res);
// 	            page.type = config.PAGE;
	            
// 				_pages[route.path] = Object.assign({}, route, page);
// 	        })
// 		)
// 	} else {
// 		return (
// 			rp.get(`${config.apiHost}${route.apiPath}?embed=pages`)
// 			.then( res => {
// 				let section = JSON.parse(res);
// 	            section.type = config.SECTION;
// 	            section.pages.forEach( page => {
// 	                page.path = routes.getRouteById(page.id).path;
// 	            })
// 				_pages[route.path] = Object.assign({}, route, section);
// 			})
// 		)
// 	}
// }

// function getSection(apiPath) {

//     return new Promise((resolve, reject) => {

//         let reqPath = `${config.apiHost}${apiPath}?embed=pages`;
//         request.get(reqPath, (err, api_res, body) => {
//             if(err) {
//                 console.log(`Could not get content from API, ${err}`);
//                 return reject();
//             }

//             let section = JSON.parse(body);
//             section.type = config.SECTION;
//             section.pages.forEach( page => {
//                 page.path = routes.getRouteById(page.id).path;
//             })

//             return resolve(section);
//         });
//     })
// }

// routes.getRouteById = (id) => {
// 	let route = _routes.find((route) => {
// 		return route.id === id;
// 	});
// 	if(!route) return false;
// 	return route;
// }

// routes.getRouteByPath = (path) => {
// 	let route = _routes.find((route) => {
// 		return route.path === path;
// 	});
// 	if(!route) return false;
// 	return route;
// }


// routes.getAll = () => {
//     return cache.get('pages');
// }


// function createRoute(page) {
// 	return {
// 		id: page.id,
// 		type: page.isParent ? config.SECTION : config.PAGE,
// 		apiPath: page.links.self,
// 		path: null
// 	};
// }

// function createUrl(pageName, sectionName) {
// 	let path = '/' + pageName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "");
// 	if(sectionName) path = '/' + sectionName.toLowerCase().replace(/ /g, "-").replace(/'/g, "").replace(/"/g, "") + path;
// 	return path;
// }

// function getPageName(id, pages) {
// 	let page = pages.find((page) => {
// 		return page.id === id;
// 	});
// 	if(!page) return false;
// 	return page.name;
// }

// module.exports = routes;