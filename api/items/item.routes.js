const express = require('express');
const router = express.Router();
const controller = require('./item.controller');

const {
  createItemHandler,
  getItemHandler,
  updateItemHandler,
  deleteItemHandler,
} = controller;


/**
 * @openapi
 * /api/items/{idList}:
 *  post:
 *   tags:
 *   - Items
 *   description: Create an item in a list favorite by User authenticated
 *   summary: Create an item in a list favorite by User authenticated
 *   parameters:
 *     - in: path
 *       name: idList
 *       description: Id of list favorite
 *       required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
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
 *     description: The item created
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
 *    403:
 *     description: Access Restricted
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 *    404:
 *     description: Favorite not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.post('/:idList', createItemHandler);

/**
 * @openapi
 * /api/items/{idList}/{idItem}:
 *  get:
 *   tags:
 *   - Items
 *   description: Get a single item in a list favorite by User authenticated
 *   summary: Get a single item in a list favorite by User authenticated
 *   parameters:
 *     - in: path
 *       name: idList
 *       description: Id of list favorite
 *       required: true
 *     - in: path
 *       name: idItem
 *       description: Id of item
 *       required: true
 *   responses:
 *    200:
 *     description: The item
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
 *    404:
 *     description: Favorite not found or Item not found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.get('/:idList/:idItem', getItemHandler);

/**
 * @openapi
 * /api/items/{idList}/{idItem}:
 *  delete:
 *   tags:
 *   - Items
 *   description: Delete a single item in a list favorite by User authenticated
 *   summary: Delete a single item in a list favorite by User authenticated
 *   parameters:
 *     - in: path
 *       name: idList
 *       description: Id of list favorite
 *       required: true
 *     - in: path
 *       name: idItem
 *       description: Id of item
 *       required: true
 *   responses:
 *   200:
 *    description: The item deleted successfully
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/favoriteResponse'
 *   500:
 *    description: Internal server error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/error'
 *   404:
 *    description: Favorite not found or Item not found
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/error'
 */
router.delete('/:idList/:idItem', deleteItemHandler);

/**
 * @openapi
 * /api/items/{idList}/{idItem}:
 *  put:
 *   tags:
 *   - Items
 *   description: Update a single item in a list favorite by User authenticated
 *   summary: Update a single item in a list favorite by User authenticated
 *   parameters:
 *    - in: path
 *      name: idList
 *      description: Id of list favorite
 *      required: true
 *    - in: path
 *      name: idItem
 *      description: Id of item
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *         description: Title of item
 *         example: My item
 *        description:
 *         type: string
 *         description: Description of item
 *         example: My description
 *        url:
 *         type: string
 *         description: Url of item
 *         example: https://myurl.com
 *   responses:
 *   200:
 *    description: The item updated successfully
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/favoriteResponse'
 *   500:
 *    description: Internal server error
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/error'
 *   404:
 *    description: Favorite not found or Item not found
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/error'
 * 
 */
router.patch('/:idList/:idItem', updateItemHandler);

module.exports = router;



