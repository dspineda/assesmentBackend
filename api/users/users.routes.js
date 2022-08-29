const express = require('express');
const controller = require('./users.controller');
const { registerLogin } = require('./users.JoiSchema');
const { isAuthenticated } = require('../../auth/auth.service');

const {
	getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
} = controller;

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *  get:
 *   tags:
 *   - Users
 *   description: Get all users
 *   summary: Get all users
 *   responses:
 *     200:
 *      description: An array of users
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/userResponse'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/error'
 */
router.get('/', getAllUsersHandler);

/**
 * @openapi
 * /api/users:
 *  post:
 *   tags:
 *   - Users
 *   description: Create a new user an return the user
 *   summary: Create a new user 
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         example: John 
 *         description: The name of the user
 *         default: John Doe
 *        email:
 *         type: string
 *         example: jd@exmaple.com
 *        lastName:
 *         type: string
 *         example: Doe
 *         description: The last name of the user
 *         default: Doe
 *        password:
 *         type: string
 *         example: 12-*abCD
 *         description: The password of the user contain at least two number, two uppercase letter, two lowercase letter and two special character
 *         default: 12-*abCD
 *        userName: 
 *         type: string
 *         example: jdoe
 *         description: The user name of the user
 *         default: jdoee
 *       required:
 *       - name
 *       - email
 *       - lastName
 *       - password 
 *       - userName
 *   responses:
 *     201:
 *      description: A single user
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/userResponse'
 *     500:
 *      description: Internal server error
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/error'
 */
router.post('/', registerLogin, createUserHandler);

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *   tags:
 *   - Users
 *   description: Get a user by id
 *   summary: Get a user by id
 *   parameters:
 *     - in: path
 *       name: id
 *       description: The id of the user
 *       required: true
 *   responses:
 *    200:
 *     description: The user found
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/userResponse' 
 *    500:
 *     description: Internal server error
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/error'
 */
router.get('/:id', getUserByIdHandler);

/**
 * @openapi
 * /api/users/{id}:
 *  patch:
 *   tags:
 *   - Users
 *   description: Update a user by id
 *   summary: Update a user by id 
 *   parameters:
 *    - in: path
 *      name: id
 *      description: The id of the user
 *      required: true
 *    - in: body
 *      name: body
 *      description: The body of the user
 *      required: true
 *   responses:
 *    200:  
 *     description: The user updated
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
router.patch('/:id', updateUserHandler);

/**
 * @openapi
 * /api/users/{id}:
 *  delete:
 *   tags:
 *   - Users
 *   description: Delete a single user by id
 *   summary: Delete a single user with id
 *   parameters:
 *     - in: path
 *       name: id
 *       description: The id of the user
 *       required: true
 *   responses:
 *    200:  
 *     description: The user deleted
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
router.delete('/:id', isAuthenticated, deleteUserHandler);

module.exports = router;
