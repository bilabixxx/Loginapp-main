const jsonwebtoken = require('jsonwebtoken');

const generateJWTtoken = (user) => {
	const now = new Date();
	const _id = user._id;
	const day = 1000 * 3600 * 24;
	const expiresIn = now.getTime() + day;
	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
		expiresIn,
	});

	return {
		token: 'Bearer ' + signedToken,
		expires: expiresIn,
	};
};

module.exports.generateJWTtoken = generateJWTtoken;
