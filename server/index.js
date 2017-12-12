'use strict';

global.appRoute = __dirname;

const app = require('./app.js');
const routes = require('./routes.js');
const config = require('../config/config.js');

routes.generateRoutes();
app.listen(config.port, () => {

	console.log(`Express Server started listening to port ${config.port}`);
	
});