const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { version } = require('../package.json');

const routesApi = path.join(__dirname, '../api/**/*.routes.js');
const routesApi2 = path.join(__dirname, '../auth/local/local.routes.js');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version,
			description: 'API Documentation to example',
			license: {
				name: 'MIT',
				url: 'https://opensource.org/licenses/MIT',
			},
			contact: {
				name: 'David Pineda',
				url: 'https://example.com/contact',
				email: 'johndoe@example.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:8080/',
				description: 'Local server',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: [routesApi, routesApi2], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Docs in JSON format
	app.get('/docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	console.log(`Swagger docs running on http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
