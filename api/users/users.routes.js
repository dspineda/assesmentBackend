const express = require('express');
const controller = require('./users.controller');
const { registerLogin } = require('./users.JoiSchema');


const {
	getAllUsersHandler,
	createUserHandler,
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




module.exports = router;
