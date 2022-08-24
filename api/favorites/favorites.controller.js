const services = require('./favorites.services');

const { getAllFavorites, getFavoriteById, findFavoriteByTitle, createFavorite, updateFavorite, deleteFavorite } = services;

async function getAllFavoritesHandler(req, res) {
  try {
    const favorites = await getAllFavorites();
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getFavoriteByIdHandler(req, res) {
  try {
    const favorite = await getFavoriteById(req.params.id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function findFavoriteByTitleHandler(req, res) {
  try {
    const favorite = await findFavoriteByTitle(req.params.title);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function createFavoriteHandler(req, res) {
  const favoriteData = req.body;
  try {
    const favorite = await createFavorite(favoriteData);
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateFavoriteHandler(req, res) {
  const id = req.params.id;
  const favoriteData = req.body;
  try {
    const favorite = await updateFavorite(id, favoriteData);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteFavoriteHandler(req, res) {
  const id = req.params.id;
  try {
    const favorite = await deleteFavorite(id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllFavoritesHandler,
  getFavoriteByIdHandler,
  findFavoriteByTitleHandler,
  createFavoriteHandler,
  updateFavoriteHandler,
  deleteFavoriteHandler
}
