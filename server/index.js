'use strict';

global.appRoute = __dirname;

const config = require('../config/config.js');
const contentService = require('./contentService.js');
const app = require('./app.js');

contentService.generateAll();

app.listen(config.port, () => {

	console.log(`Express Server started listening to port ${config.port}`);
	
});