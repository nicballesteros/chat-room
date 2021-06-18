//Nic Ballesteros
//Created 06/17/21

const mongoose = require('mongoose');
const User = require('mongoose').model('User');

const utils = require('../../auth/utils');

module.exports = async (req, res, next) => {
    try {
        //find the user in the database.
        let user = await User.findOne({
            username: req.body.username,
        });

        //If the user was not found.
        if (!user) {
            res.status(401).json({
                success: false,
                msg: "Could not find user",
            });
        }

        //Validate the password passed from the user.
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

        //If it is valid, send a jwt to the user.
        if (isValid) {
            const tokenObj = utils.issueJWT(user);

            res.status(200).json({
                success: true,
                user: user,
                token: tokenObj.token,
                expires: tokenObj.expires,
            });

            return;
        }

        //If not valid, send an error msg.
        res.status(401).json({
            sucess: false,
            msg: "Wrong Password",
        });
    } catch(err) {
        next(err);
    }
};