const Favorite = require('./listFavorite.model');

function getAllFavoritesByUser(id) {
  return Favorite.find({ owner: id }).populate('owner');
}

function createFavorite(favoriteData) {
  return Favorite.create(favoriteData);
}

function getFavoriteById(id) {
  return Favorite.findById(id).populate('owner');
}

function updateFavoriteById(id, favoriteData) {
  return Favorite.findByIdAndUpdate(id, favoriteData, { new: true });
}

function deleteFavoriteById(id) {
  return Favorite.findByIdAndDelete(id);
}

module.exports = {
  getAllFavoritesByUser,
  createFavorite,
  getFavoriteById,
  deleteFavoriteById,
  updateFavoriteById,
};