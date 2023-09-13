const app = require('./app');
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';
const connectDB = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const server = app.listen(PORT, async () => {

  await  mongoose.connect('mongodb://monguito:27017/miapp');  /*connectDB()*/
 
	console.log(
		`Server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
	);
  console.log('Connected to mongo🚀');
});

module.exports = { app, server };
