const services = require('./listFavorite.service');

const { addFavoriteByUser } = require('../users/users.services');


const { getAllFavoritesByUser, createFavorite, getFavoriteById, updateFavoriteById, deleteFavoriteById } = services;

async function getAllFavoritesHandler(req, res) {
  const user = await req.user;
  try {
    const favorites = await getAllFavoritesByUser(user._id);
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

async function createItemHandler(req, res) {
  const user = await req.user;
  const {idList} = req.params; 
  const itemData = req.body;
  try {
    const favorite = await getFavoriteById(idList);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    favorite.items.push(itemData);
    await favorite.save();
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}


async function getFavoriteByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const favorite = await getFavoriteById(id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateFavoriteByIdHandler(req, res) {
  const { id } = req.params;
  const favoriteData = req.body;
  try {
    const favorite = await updateFavoriteById(id, favoriteData);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteFavoriteByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const favorite = await deleteFavoriteById(id);
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllFavoritesHandler,
  createFavoriteHandler,
  getFavoriteByIdHandler,
  deleteFavoriteByIdHandler,
  updateFavoriteByIdHandler,
  createItemHandler,
};
