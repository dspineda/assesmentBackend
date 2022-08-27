const User = require('./users.model');

function getAllUsers() {
	return User.find({});
}

function getUserById(id) {
	return User.findById(id);
}

function findUserByEmail(email) {
	return User.findOne({ email });
}

function findOneUser(query) {
	return User.findOne(query);
}

function createUser(user) {
	return User.create(user);
}

function updateUser(id, user) {
	return User.findByIdAndUpdate(id, user, { new: true });
}

function deleteUser(id) {
	return User.findByIdAndRemove(id);
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
	getUserById,
	findUserByEmail,
	findOneUser,
	createUser,
	updateUser,
	deleteUser,
  addFavoriteByUser,
  deleteFavoriteByUser
};
