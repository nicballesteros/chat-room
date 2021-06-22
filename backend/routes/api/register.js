const { Mongoose } = require('mongoose');
const utils = require('../../auth/utils');

const User = require('mongoose').model('User');

module.exports = async (req, res, next) => {
    //Check to see that there are no users with the same name in the database.
    try {
        let user = await User.findOne({
            username: req.body.username,
        });

        if (user) {
            res.status(409).json({
                success: false,
                msg: 'Username Taken',
            });

            console.log('Username was already taken');

            return;
        }
    } catch (err) {
        console.error(err);

        //If an err occurs, send a 500 code and do not make a new user.

        res.sendStatus(500);
        return;
    }


    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        threads: [],
        friends: [],
        requests: [],
    });

    try {

        await newUser.save();

        const jwt = utils.issueJWT(newUser);

        res.json({
            success: true,
            user: newUser,
            token: jwt.token,
            expiresIn: jwt.expires,
        });

    } catch (err) {
        next(err);
    }
};