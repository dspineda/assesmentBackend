const express = require('express');
const controller = require('./users.controller')
const { registerLogin } = require('./users.JoiSchema');
const { isAuthenticated } = require('../../auth/auth.service');

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
router.patch('/:id',   updateUserHandler);
router.delete('/:id', isAuthenticated, deleteUserHandler);



 module.exports = router;

 