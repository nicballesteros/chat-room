//Nic Ballesteros
//Created 6/30/21

// const { Mongoose } = require('mongoose');

// const mongoose = require('mongoose');
// const User = require('mongoose').model('User');

module.exports = async (req, res, next) => {
    try {
        //If the users do not exist, send a does not exist message.
        res.status(200).json({
            user: req.user,
            success: true,
        });
    } catch (err) {
        console.error(err);

        //If an error occurs send a 500 status.
        res.sendStatus(500);
    }
}