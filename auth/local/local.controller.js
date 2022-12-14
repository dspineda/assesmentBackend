const {findUserByEmail} = require('../../api/users/users.services');
const { signToken } = require('../auth.service')


async function loginUserHandler(req, res) {
	const { email, password } = req.body;

	try {
		const user = await findUserByEmail(email);
		if (!user) {
			return res
				.status(404)
				.json({ message: 'User or password not registred' });
		}
    const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res
				.status(404)
				.json({ message: 'User or password not registred' });
		}
    const token = await signToken({email: user.email})
    return res.json({token}).status(200)
    
	} catch (error) {
		return res.status(500).json({ error });
	}
}










module.exports = {
  loginUserHandler,
};
