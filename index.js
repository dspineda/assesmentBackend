const app = require('./app');
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';
const connectDB = require('./config/database');
const server = app.listen(PORT, async () => {
	await connectDB();

	console.log(
		`Server running on port http://localhost:${PORT} in ${NODE_ENV} mode`
	);
});

module.exports = { app, server };
