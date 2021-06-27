const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const { getUsernameFromId, getUserFromUsername } = require('../../../db/utils');
const User = mongoose.model('User');
const MessageThread = mongoose.model('MessageThread');

module.exports = async (req, res, next) => {
    try {
        //A list of usernames.  
        let usernames = req.body.usernames;

        if (usernames.length > 1) {
            //Check to see if the current user's username is in the request.
            for (let i = 0; i < usernames.length; i++) {
                if (usernames[i] === req.user.username) {
                    throw new Error('Cannot make a thread with yourself and someone else. Can make a thread with yourself exclusivly.');
                }
            }

        }

        if (usernames.length < 1) {
            //TODO Throw Error to handle later.
            throw new Error('Did not include any usernames to start a thread with.');
        }

        //Promise Array.
        let users = [];

        usernames.push(req.user.username);

        usernames.forEach(element => {
            users.push(getUserFromUsername(element));
        });

        users = await Promise.all(users);

        //TODO check that the message thread has not already been created.
        //ALGO: first go to the users to see if they all have one thread in common.
        //Double check that that thread is inclusive only to those users and not other users.

        //The object to eventually send to the db server to make a new thread.
        messageThreadObj = {
            messages:[],
            users: [],
        }

        //Make the users have ids and names.
        users.forEach(element => {
            messageThreadObj.users.push({
                _id: element._id,
                username: element.username,
            });
        });
        
        //Create a new message thread.
        let messageThread = new MessageThread(messageThreadObj);

        //Wait for the messageThread to save.
        await messageThread.save();

        // //Save the new threads in all the users profiles.
        // await User.updateOne(
        //     { username: req.user.username },
        //     { $push: { threads: messageThread._id } }
        // );

        let promises = [];

        usernames.forEach(element => {
            promises.push(User.updateOne(
                { username: element },
                { $push: { threads: messageThread._id } }
            ));
        });

        await Promise.all(promises);

        res.status(200).json({
            success: true,
            msg: 'The new message thread was created.',
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}