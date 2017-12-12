'use strict';

const express = require('express');
const request = require('request');
const path = require('path');

const controller = require('./controller.js');

const app = express();

//static files
app.use(function(req, res, next) {
    console.log("Request: " + req.url);
    next();
});


app.use(express.static(path.join(global.appRoute, '../build')));

app.get('/api/navigation', controller.getNavigation);
app.get('/api/*', controller.getContent);
app.get('*', (req, res) => {
	res.sendFile(path.resolve(global.appRoute, '../build/index.html'));
});

module.exports = app;