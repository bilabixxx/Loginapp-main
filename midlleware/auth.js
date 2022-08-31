const passport = require('passport');
const User = require('../models/User');

const authorized = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, async (err, token) => {
		if (err || !token) {
			res.status(401).json({ message: 'You are not authorized!' });
		}

		try {
			const user = await User.findOne({ _id: token.sub });
			req.user = user;
		} catch (error) {
			res.status(401).json({ message: 'You are not authorized!' });
		}

		next();
	})(req, res, next);
};

module.exports = { authorized };