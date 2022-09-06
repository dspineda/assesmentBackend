const Favorite = require('./listFavorites.model');

function getAllListFavorites() {
  return Favorite.find({});
}

function createListFavorite(favorite) {
  return Favorite.create(favorite);
}

function getSingleListFavorite(id) {
  return Favorite.findById(id);
}

function deleteListFavorite(id) {
  return Favorite.findByIdAndRemove(id);
}

module.exports = {
  getAllListFavorites,
  createListFavorite,
  getSingleListFavorite,
  deleteListFavorite
}
