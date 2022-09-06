const express = require('express');
const controller = require('./listFavorites.controller')
const { isAuthenticated } = require('../../auth/auth.service')

const {
  getAllListFavoritesHandler,
  createListFavoriteHandler,
  getSingleListFavoriteHandler,
  deleteListFavoriteHandler
} = controller

const router = express.Router();
/**
 * @openapi
 * /api/favs:
 *  get:
 *   tags:
 *   - Favorites
 *   description: Get all favorites
 *   summary: Get all favorites
 *   responses:
 *    200:
 *     description: An array of favorites
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
router.get('/',  isAuthenticated, getAllListFavoritesHandler);

/**
 * @openapi
 * /api/favs:
 *  post:
 *   tags:
 *   - Favorites
 *   description: Create a favorite
 *   summary: Create a favorite
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *         example: Favorite Title
 *         description: The title of the favorite
 *         default: Favorite from swagger
 *        description:
 *         type: string
 *         example: Favorite Description
 *         description: The description of the favorite
 *         default: Favorite from swagger in test
 *        url:
 *         type: string
 *         example: www.google.com
 *         description: The url of the favorite
 *         default: www.google.com
 *        name:
 *         type: string
 *         example: Movies
 *         description: The name of the list
 *         default: Movies
 *         unique: true
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
router.post('/', isAuthenticated, createListFavoriteHandler);

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
router.get('/:id', isAuthenticated, getSingleListFavoriteHandler);

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
router.delete('/:id', isAuthenticated, deleteListFavoriteHandler);


module.exports = router;

