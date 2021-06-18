//Nic Ballesteros
//Created 06/17/21

const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



const pathToKey = path.join(__dirname, 'keys', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const passportJWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
}

const strategy = new JWTStrategy(passportJWTOptions, (payload, done) => {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch((err) => {
            return done(err, null);
        });
});

module.exports = (passport) => {
    passport.use(strategy);
};