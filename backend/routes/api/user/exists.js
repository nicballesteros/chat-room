const { Mongoose } = require('mongoose');

const mongoose = require('mongoose');
const User = require('mongoose').model('User');

module.exports = async (req, res, next) => {
    //The username sent from the user.
    let usernames = req.body.usernames;

    console.log(usernames);

    try {
        let promises = [];

        //Find the users in the database.
        usernames.forEach(item => {
            let promise = User.findOne({
                username: item,
            });

            promises.push(promise);
        })

        let ret = await Promise.all(promises);

        let exists = true;

        ret.forEach(element => {
            if (element == null) {
                exists = false;
            }
        });

        if (exists) {
            //If the users do exist, send an exists message.
            res.status(200).json({
                exists: true,
                msg: 'Users exist',
            });

            return;
        }

        //If the users do not exist, send a does not exist message.
        res.status(200).json({
            exists: false,
            msg: 'Users do not exist',
        });

    } catch (err) {
        console.error(err);

        //If an error occurs send a 500 status.
        res.sendStatus(500);
    }
}