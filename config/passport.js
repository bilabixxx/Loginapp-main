const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
	try {
		passport.use(
			new JwtStrategy(options, (jwt_payload, done) => {
				User.findOne({ _id: jwt_payload.sub }, (err, user) => {
					if (err) { return done(err, false); }

					if (!user) { return done(null, false); }

					return done(null, user);
				});
			})
		);
	} catch (error) {
		console.error(error.message);
	}
};
