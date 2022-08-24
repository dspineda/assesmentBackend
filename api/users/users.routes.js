const express = require('express');
const controller = require('./users.controller')

const {
  getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
 } = controller

 const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getUserByIdHandler);
router.post('/', createUserHandler);

 module.exports = router;

 