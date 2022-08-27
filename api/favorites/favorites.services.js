const Favorite = require('./favorites.model');

function getAllFavorites() {
  return Favorite.find({});
}

function createFavorite(favorite) {
  return Favorite.create(favorite);
}

function getSingleFavorite(id) {
  return Favorite.findById(id);
}

function deleteFavorite(id) {
  return Favorite.findByIdAndRemove(id);
}

module.exports = {
  getAllFavorites,
  createFavorite,
  getSingleFavorite,
  deleteFavorite
}
