const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }
);

const Favorites = mongoose.model('Favorites', FavoriteSchema);

module.exports = Favorites;