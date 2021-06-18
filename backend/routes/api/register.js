const utils = require('../../auth/utils');

const User = require('mongoose').model('User');

module.exports = async (req, res, next) => {
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
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