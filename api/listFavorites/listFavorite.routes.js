const express = require('express');
const router = express.Router();
const controller = require('./listFavorite.controller');


const {
	getAllFavoritesHandler,
	createFavoriteHandler,
	getFavoriteByIdHandler,
	deleteFavoriteByIdHandler,
	updateFavoriteByIdHandler,
} = controller;

/**
 * @openapi
 * /api/favs:
 *  get:
 *   tags:
 *   - Favorites
 *   description: Get all favorites by User
 *   summary: Get all favorites
 *   responses:
 *    200:
 *     description: An array of favorites by user and populated with owner
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/favoriteResponse'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.get('/', getAllFavoritesHandler);

/**
 * @openapi
 * /api/favs:
 *  post:
 *   tags:
 *   - Favorites
 *   description: Create a favorite with items by User authenticated
 *   summary: Create a favorite with items by User authenticated
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: Name of favorite
 *         example: My favorite
 *        items:
 *         type: array
 *         description: Array of items
 *         items:
 *          type: object
 *          properties:
 *           title:
 *            type: string
 *            description: Title of item
 *            example: My item
 *           description:
 *            type: string
 *            description: Description of item
 *            example: My description
 *           url:
 *            type: string
 *            description: Url of item
 *            example: https://myurl.com
 *   responses:
 *    201:
 *     description: The favorite created
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/favoriteResponse'
 *   500:
 *    description: Internal server error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/error'
 */
router.post('/', createFavoriteHandler);


/**
 * @openapi
 * /api/favs/{id}:
 *  get:
 *   tags:
 *   - Favorites
 *   description: Get a single favorite
 *   summary: Get a single favorite by id
 *   parameters:
 *     - in: path
 *       name: id
 *       description: The id of the favorite
 *       required: true
 *   responses:
 *    200:
 *     description: The favorite found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/favoriteResponse'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.get('/:id', getFavoriteByIdHandler);

/**
 * @openapi
 * /api/favs/{id}:
 *  patch:
 *   tags:
 *   - Favorites
 *   description: Update a single favorite
 *   summary: Update a single favorite by id
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The id of the favorite
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: Name of favorite
 *         example: My favorite
 *        items:
 *         type: array
 *         description: Array of items
 *         items:
 *          type: object
 *          properties:
 *           title:
 *            type: string
 *            description: Title of item
 *            example: My item
 *           description:
 *            type: string
 *            description: Description of item
 *            example: My description
 *           url:
 *            type: string
 *            description: Url of item
 *            example: https://myurl.com
 *   responses:
 *    200:
 *     description: The favorite updated
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/favoriteResponse'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */

router.patch('/:id', updateFavoriteByIdHandler);

/**
 * @openapi
 * /api/favs/{id}:
 *  delete:
 *   tags:
 *   - Favorites
 *   description: Delete a single favorite
 *   summary: Delete a single favorite by id
 *   parameters:
 *     - in: path
 *       name: id
 *       description: The id of the favorite
 *       required: true
 *   responses:
 *    200:
 *     description: The favorite deleted
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/favoriteResponse'
 *    401:
 *     description: Unauthorized
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.delete('/:id', deleteFavoriteByIdHandler);

module.exports = router;
