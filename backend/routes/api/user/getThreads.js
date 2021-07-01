const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const MessageThread = mongoose.model('MessageThread');

const utils = require('../../../db/utils');

module.exports = async (req, res, next) => {
    try {
        //Find the user in the database.
        let user = await User.findOne({
            username: req.user.username,
        });

        //A promise array so that all the data can be fetched.
        let mongoRequests = [];

        //Query each thread for their users.
        user.threads.forEach(element => {
            //Push this promise onto the promise array.
            mongoRequests.push(MessageThread.findOne({
                _id: element,
            }));
        })

        //Get all the threads that this user has.
        let threadData = await Promise.all(mongoRequests);

        //Send a 200 signal with the data.
        res.status(200).json({
            success: true,
            threads: threadData,
        });
    } catch (err) {
        console.error(err);

        //Theres been an error so send a 500 status code.
        res.sendStatus(500);
    }
}