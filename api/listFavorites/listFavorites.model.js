const mongoose = require('mongoose');


const ListFavoriteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items:{
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

const ListFavorite = mongoose.model('ListFavorite', ListFavoriteSchema);

module.exports = ListFavorite;

