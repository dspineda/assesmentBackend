const services = require('./favorites.services');
const { addFavoriteByUser, deleteFavoriteByUser } = require('../users/users.services');

const { getAllFavorites, deleteFavorite, getSingleFavorite, createFavorite } = services;

async function getAllFavoritesHandler(req, res) {
  try {
    const favorites = await getAllFavorites();
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function createFavoriteHandler(req, res) {
  const user = await req.user;
  const tempDataFavorite = req.body;
  const favoriteData = {...tempDataFavorite, owner: user._id,};
  
  try {
    const favorite = await createFavorite(favoriteData);
   
    await favorite.save()
    await addFavoriteByUser(user._id, favorite._id);
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteFavoriteHandler(req, res) {
  const user = await req.user;
  const favoriteId = req.params.id;
  try {
    const favorite = await getSingleFavorite(favoriteId);
    if (favorite.owner.toString() !== user._id.toString()) {
      return res.status(401).json({ error: 'You are not authorized to delete this favorite' });
    }
    await deleteFavorite(favorite);
    await deleteFavoriteByUser(user._id, favoriteId);
    return res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function getSingleFavoriteHandler(req, res) {
  const id = req.params.id;
  try {
    const favorite = await getSingleFavorite(id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}





module.exports = {
  getAllFavoritesHandler,
  createFavoriteHandler,
  getSingleFavoriteHandler,
  deleteFavoriteHandler
}
