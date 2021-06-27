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

        let mongoRequests = [];

        user.threads.forEach(element => {
            mongoRequests.push(MessageThread.findOne({
                _id: element,
            }));
        })

        let threadData = await Promise.all(mongoRequests);

        console.log(threadData);

        res.status(200).json({
            success: true,
            threads: threadData,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}