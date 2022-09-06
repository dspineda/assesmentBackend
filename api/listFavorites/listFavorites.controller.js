const services = require('./listFavorites.services');
const { addListFavoriteByUser, deleteListFavoriteByUser } = require('../users/users.services');

const { getAllListFavorites, deleteListFavorite, getSingleListFavorite, createListFavorite } = services;

async function getAllListFavoritesHandler(req, res) {
  try {
    const favorites = await getAllListFavorites();
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function createListFavoriteHandler(req, res) {
  const user = await req.user;
  const tempDataFavorite = req.body;
  const favoriteData = {...tempDataFavorite, owner: user._id,};
  
  try {
    const favorite = await createListFavorite(favoriteData);
   
    await favorite.save()
    await addListFavoriteByUser(user._id, favorite._id);
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteListFavoriteHandler(req, res) {
  const user = await req.user;
  const favoriteId = req.params.id;
  try {
    const favorite = await getSingleListFavorite(favoriteId);
    if (favorite.owner.toString() !== user._id.toString()) {
      return res.status(401).json({ error: 'You are not authorized to delete this favorite' });
    }
    await deleteListFavorite(favorite);
    await deleteListFavoriteByUser(user._id, favoriteId);
    return res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function getSingleFavoriteHandler(req, res) {
  const id = req.params.id;
  try {
    const favorite = await getSingleListFavorite(id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}


module.exports = {
  getAllListFavoritesHandler,
  createListFavoriteHandler,
  getSingleFavoriteHandler,
  deleteListFavoriteHandler
}
