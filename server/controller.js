'use strict';

const request = require('request');

const config = require('../config/config.js');
const routes = require('./routes.js');

exports.getContent = (req, res) => {

	let path = req.path.replace("/api", "");

	let route = routes.getRouteByPath(path);
	if(!route) return res.status(404).send();

    if(route.type === config.PAGE) {
        getPage(route.apiPath).then( content => {
            res.json(content);
        })
        .catch( err => {
            console.log(err);
            res.status(500).send();
        });
    } else if (route.type === config.SECTION) {
        getSection(route.apiPath).then( content => {
            res.json(content);
        })
        .catch( err => {
            console.log(err);
            res.status(500).send();
        });
    } else {
        console.log(`Unrecognised page type, ${route}`);
        res.status(500).send();
    }

}

exports.getNavigation = (req, res) => {

    request.get(`${config.apiHost}/navigation`, (err, api_res, body) => {
        if(err) {
            console.log(`Could not get navigation from API, ${err}`);
            return res.status(500).send();
        }

        let links = JSON.parse(body);
        links.forEach( link => {
            link.path = routes.getRouteById(link.id).path;
        })

        return res.json(links);
    });

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

        let reqPath = `${config.apiHost}${apiPath}?embed=pages`;
        request.get(reqPath, (err, api_res, body) => {
            if(err) {
                console.log(`Could not get content from API, ${err}`);
                return reject();
            }

            let section = JSON.parse(body);
            section.type = config.SECTION;
            section.pages.forEach( page => {
                page.path = routes.getRouteById(page.id).path;
            })

            return resolve(section);
        });
    })
}