const services = require('./users.services');


const { getAllUsers, createUser } =
	services;

async function getAllUsersHandler(req, res) {
	try {
    console.log('Showing all users');
		const users = await getAllUsers();
		return res.status(200).json(users);
	} catch (error) {
    console.error(`[ERROR]: ${error}`);
		return res.status(500).json({ error });
	}
}
async function createUserHandler(req, res) {
	const userData = req.body;
	try {
		const user = await createUser(userData);
    console.log('User created successfully', user);
		return res.status(201).json(user);
	} catch (error) {
    console.error(`[ERROR]: ${error}`);
		return res.status(500).json({ error });
    
	}
}








module.exports = {
	getAllUsersHandler,
	createUserHandler,

};


