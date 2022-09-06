const User = require('./users.model');

function getAllUsers() {
	return User.find({});
}

function findUserByEmail(email) {
	return User.findOne({ email });
}


function createUser(user) {
	return User.create(user);
}



function addFavoriteByUser(id, favorite) {
	return User.findByIdAndUpdate(
		id,
		{ $push: { favoritesList: favorite } },
		{ new: true }
	);
}

function deleteFavoriteByUser(id, favorite) {
  return User.findByIdAndUpdate(
    id,
    { $pull: { favoritesList: favorite } },
    { new: true }
  );
}



module.exports = {
	getAllUsers,
	findUserByEmail,
	createUser,
  addFavoriteByUser,
  deleteFavoriteByUser
};
