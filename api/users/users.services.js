const User = require('./users.model');

function getAllUsers() {
	return User.find({});
}

function findUserByEmail(email) {
	return User.findOne({ email });
}


function createUser(user) {
	return User.create(user)
}



function addFavoriteByUser(id, favorite) {
	return User.findByIdAndUpdate(
		id,
		{ $push: { lists: favorite } },
		{ new: true }
	);
}



module.exports = {
	getAllUsers,
	findUserByEmail,
	createUser,
  addFavoriteByUser
};
