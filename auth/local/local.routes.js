const {Router} = require('express');

const {
  loginUserHandler,
} = require('./local.controller');

const router = Router();

/**
 * @openapi
 * /api/auth/local/login:
 *  post:
 *   tags:
 *   - Auth
 *   description: Login a user and return token
 *   summary: Login a user 
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         example: jd@exmaple.com
 *         description: The email of the user
 *         default: jd@exmaple.com
 *        password:
 *         type: string
 *         example: 12-*abCD
 *         description: The password of the user
 *         default: 12-*abCD
 *       required:
 *       - email
 *       - password
 *   responses:
 *    200:
 *     description: Login a user and return token
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         token:
 *          type: string
 *          description: The token of the user
 *    404:
 *     description: User not found or password is incorrect
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
router.post('/login', loginUserHandler);

module.exports = router;