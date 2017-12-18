'use strict';

global.appRoute = __dirname;

const config = require('../config/config.js');
const controller = require('./controller.js');
const app = require('./app.js');

controller.generateContent();

app.listen(config.port, () => {

	console.log(`Express Server started listening to port ${config.port}`);
	
});