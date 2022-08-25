const services = require('./users.services');


const { getAllUsers, findUserByEmail, createUser, updateUser, deleteUser } =
	services;

async function getAllUsersHandler(req, res) {
	try {
		const users = await getAllUsers();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ error });
	}
}
async function createUserHandler(req, res) {
	const userData = req.body;
	try {
		const user = await createUser(userData);
		return res.status(201).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function getUserByIdHandler(req, res) {
	try {
		const user = await findUserByEmail;
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function updateUserHandler(req, res) {
	const userData = req.body;
	try {
		const user = await updateUser(userData);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function deleteUserHandler(req, res) {
	const userData = req.body;
	try {
		const user = await deleteUser(userData);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error });
	}
}


module.exports = {
	getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
};
