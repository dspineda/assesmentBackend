const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const registerSchema = joi.object({
	userName: joi.string().alphanum().min(3).max(30).required(),
	email: joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
		.required(),

	  password: joiPassword
                        .string()
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(2)
                        .minOfNumeric(2)
                        .noWhiteSpaces()
                        .required(),


	name: joi.string().min(2).max(20).required(),

	lastName: joi.string().min(2).max(20).required(),
});

function registerLogin(req, res, next) {
  const { email, password, name, lastName, userName } = req.body;
  const payload = { email, password, name, lastName, userName };
  const { error } = registerSchema.validate(payload);
  if (error) {
    return res.status(400).json({ error, message: 'missing data' });
  }
  next();
  return null;
}

module.exports = {
  registerLogin,
};