const express = require('express');
const controller = require('./favorites.controller')

const {
  getAllFavoritesHandler,
  getFavoriteByIdHandler,
  findFavoriteByTitleHandler,
  createFavoriteHandler,
  updateFavoriteHandler,
  deleteFavoriteHandler
} = controller

const router = express.Router();

router.get('/', getAllFavoritesHandler);
router.get('/:id', getFavoriteByIdHandler);
router.post('/', createFavoriteHandler);
router.put('/:id', updateFavoriteHandler);
router.delete('/:id', deleteFavoriteHandler);
router.get('/:title', findFavoriteByTitleHandler);

module.exports = router;

