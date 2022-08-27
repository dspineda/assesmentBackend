require('dotenv').config();
const express = require('express');

const configExpress = require('./config/express')
const connectDB = require('./config/database');
const routesConfig = require('./routes')
const app = express()

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, async () => {
  configExpress(app)
  await connectDB()
  routesConfig(app)
  console.log( `Server running on port http://localhost:${PORT} in ${NODE_ENV} mode`)
})

module.exports = { app, server };


