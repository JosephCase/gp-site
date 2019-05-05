'use strict';

const request = require('request');
const cache = require('memory-cache');

const config = require('../config/config.js');
const routeHelper = require('./routeHelper.js');

var pages = {};
let isUpdating = false;

exports.generateAll = async () => {

    if (!isUpdating) {

        isUpdating = true;

        try {
            await routeHelper.generateRoutes();
            await Promise.all([
                generateNavigation(),
                generatePages()
            ])
        } catch (err) {
            console.log('Error generating content', err);
        }

        isUpdating = false;
    }

}

exports.getNavigation = () => cache.get('navigation');

exports.getPages = () => cache.get('pages');

const generateNavigation = () => new Promise((resolve, reject) => {
    request.get(`${config.apiHost}/navigation?visible=true`, (err, api_res, body) => {
        if (err) {
            reject(`Could not get navigation from API, ${err}`);
            return;
        }

        let navigation = JSON.parse(body);
        navigation.forEach(link => {
            link.path = routeHelper.getRouteById(link.id).path;
        })

        cache.put('navigation', navigation)

        return resolve();

    });
})


const generatePages = () => {

    let promises = [];

    let routes = routeHelper.getAllRoutes();
    routes.forEach(route => {
        promises.push(getPageContent(route));
    });

    return Promise.all(promises).then(() => cache.put('pages', pages))
}


const getPageContent = route => {

    if (route.type === config.PAGE) {
        return getPage(route.apiPath).then(page => {
            pages[route.path] = page;
        })
    } else if (route.type === config.SECTION) {
        return getSection(route.apiPath).then(page => {
            pages[route.path] = page;
        })
    } else {
        return Promise.rejected(`Unrecognised page type, ${route}`);
    }

}


const getPage = apiPath => new Promise((resolve, reject) => {

    let reqPath = `${config.apiHost}${apiPath}?embed=content`;
    request.get(reqPath, (err, api_res, body) => {
        if (err) {
            console.log(`Could not get content from API, ${err}`);
            return reject();
        }
        let page = JSON.parse(body);
        page.type = config.PAGE;
        return resolve(page);
    });
})


const getSection = apiPath => new Promise((resolve, reject) => {

    let reqPath = `${config.apiHost}${apiPath}?embed=pages&visible=true`;
    request.get(reqPath, (err, api_res, body) => {
        if (err) {
            console.log(`Could not get content from API, ${err}`);
            return reject();
        }

        let section = JSON.parse(body);
        section.type = config.SECTION;
        section.pages.forEach(page => {
            page.path = routeHelper.getRouteById(page.id).path;
        })

        return resolve(section);
    });
})
