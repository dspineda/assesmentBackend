const services = require('./users.services');


const { getAllUsers, createUser, updateUser, deleteUser, getUserById } =
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

async function getUserByIdHandler(req, res) {
	try {
		const user = await getUserById(req.params.id); 
    console.log('User get by Id')
		return res.status(200).json(user);
	} catch (error) {
    console.error(`[ERROR]: ${error}`);
		return res.status(500).json({ error });
	}
}

async function updateUserHandler(req, res) {
  const { user } = req;
  const { id } = req.params;
  if (!(user._id === id)) {
    console.log('Cannot update another user than yourself');
    return res.status(401).json({ message: 'unAuthorized' });
  }
  const userData = req.body;
  try {
    const user = await updateUser(id, userData);
    console.log(`User ${id} updated`);
    return res.status(200).json(user);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}


async function deleteUserHandler(req, res) {
  const { user } = req;
  const { id } = req.params;
  if (!(user.id === id)) {
    console.log('Cannot delete another user than yourself');
    return res.status(401).json({ message: 'unAuthorized' });
  }
  try {
    await deleteUser(id);
    console.log(`User ${id} eliminated`);
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
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


