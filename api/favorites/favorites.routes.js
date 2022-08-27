const express = require('express');
const controller = require('./favorites.controller')
const { isAuthenticated } = require('../../auth/auth.service')

const {
  getAllFavoritesHandler,
  createFavoriteHandler,
  getSingleFavoriteHandler,
  deleteFavoriteHandler
} = controller

const router = express.Router();

router.get('/',  isAuthenticated, getAllFavoritesHandler);
router.post('/', isAuthenticated, createFavoriteHandler);
router.get('/:id', isAuthenticated, getSingleFavoriteHandler);
router.delete('/:id', isAuthenticated, deleteFavoriteHandler);


module.exports = router;

