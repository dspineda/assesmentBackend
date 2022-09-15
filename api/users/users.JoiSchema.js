const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const registerSchema = joi.object({
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
});

function registerLogin(req, res, next) {
  const { email, password } = req.body;
  const payload = { email, password};
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