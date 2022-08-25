const express = require('express');
const controller = require('./users.controller')
const { registerLogin } = require('./users.JoiSchema');

const {
  getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
  updateUserHandler,
  deleteUserHandler,
 } = controller

 const router = express.Router();

router.get('/', getAllUsersHandler);
router.post('/', registerLogin, createUserHandler);
router.get('/:id', getUserByIdHandler);
router.get('/:id', updateUserHandler);
router.get('/:id', deleteUserHandler);



 module.exports = router;

 