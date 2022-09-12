const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
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
		}
	},
	{
		timestamps: true,
	}
);

const FavoriteSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		items: [ItemSchema],
		owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
	},
	{
		timestamps: true,
	}
);

const Favorites = mongoose.model('Favorites', FavoriteSchema);

module.exports = Favorites;
