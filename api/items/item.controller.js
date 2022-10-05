const services = require('../listFavorites/listFavorite.service');

const { getFavoriteById } = services;


async function createItemHandler(req, res) {
  const user = await req.user;
 
  const {idList} = req.params; 
  const itemData = req.body;
  try {
    const favorite = await getFavoriteById(idList);
    console.log("🚀 ~ file: item.controller.js ~ line 13 ~ createItemHandler ~ favorite", favorite)

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    if (favorite.owner._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Access Restricted' });
    }
    favorite.items.push(itemData);
    await favorite.save();
    return res.status(201).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function getItemHandler(req, res) {
  const { idList, idItem } = req.params;
  try {
    const favorite = await getFavoriteById(idList);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    const item = favorite.items.id(idItem);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function updateItemHandler(req, res) {
  const { idList, idItem } = req.params;
  try {
    const favorite = await getFavoriteById(idList);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    const item = favorite.items.id(idItem);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    item.set(req.body);
    await favorite.save();
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function deleteItemHandler(req, res) {
  const { idList, idItem } = req.params;
  try {
    const favorite = await getFavoriteById(idList);
    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    const item = favorite.items.id(idItem);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    item.remove();
    await favorite.save();
    return res.status(200).json(favorite);
  } catch (error) {
    return res.status(500).json({ error });
  }

}

module.exports = {
  createItemHandler,
  getItemHandler,
  updateItemHandler,
  deleteItemHandler,
};

