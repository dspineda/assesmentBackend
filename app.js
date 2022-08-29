require('dotenv').config();
const express = require('express');

const configExpress = require('./config/express');
const routesConfig = require('./routes');
const swagger = require('./config/swagger');

const app = express();

const PORT = process.env.PORT || 8080;

configExpress(app);
routesConfig(app);
swagger(app, PORT);

module.exports = app;
