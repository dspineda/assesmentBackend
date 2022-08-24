const Favorite = require('./favorites.model');

function getAllFavorites() {
  return Favorite.find({});
}

function getFavoriteById(id) {
  return Favorite.findById(id);
}

function findFavoriteByTitle(title){
  return Favorite.findOne({ title })
}

function createFavorite(favorite) {
  return Favorite.create(favorite);
}

function updateFavorite(id, favorite) {
  return Favorite.findByIdAndUpdate(id, favorite, { new: true });
}

function deleteFavorite(id) {
  return Favorite.findByIdAndRemove(id);
}

module.exports = {
  getAllFavorites,
  getFavoriteById,
  findFavoriteByTitle,
  createFavorite,
  updateFavorite,
  deleteFavorite
}
