'use strict';

import express from 'express';
import path from 'path';

const controller = require('./controller.js');

const app = express();

//static files
app.use(function(req, res, next) {
    console.log("Request: " + req.url);
    next();
});


app.use('/static', express.static(path.join(global.appRoute, '../build/static/')));

// app.get('/api/navigation', controller.getNavigation);
// app.get('/api/*', controller.getContent);

app.use((req, res) => {
	if(req.path !== '/favicon.ico') controller.serveBundle(req, res);
});

module.exports = app;