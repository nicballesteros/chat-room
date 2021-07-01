let mongoose = require('mongoose');
let User = mongoose.model('User');
let MessageThread = mongoose.model('MessageThread');

module.exports = {

    /**
     * @description This function converts a user id to a user username.
     * 
     * @param {String} _id 
     * @returns {Promise} A promise for the username of the user with the _id
     */ 

    getUsernameFromId(_id) {
        return new Promise(async (resolve, reject) => {
            try {
                //Find the user from the db.
                let user = await User.findById(_id);

                //If the user exists, return the username.
                if (user) {
                    resolve(user.username);
                    return;
                }

                reject(new Error('User was not found in the database.'));
            } catch (err) {
                reject(err);
            }
        });
    },

    /**
     * @description A function that returns the User object for a specific username.
     * Throws an error if the user was not found.
     * 
     * @param {String} username 
     * @returns {Promise} A promise for the user object from the database.
     */

    getUserFromUsername(username) {
        return new Promise(async (resolve, reject) => {
            try {
                //Find the user from the db.
                let user = await User.findOne({
                    username: username,
                });

                //If the user exists, return the username.
                if (user) {
                    resolve(user);
                    return;
                }

                reject();
            } catch (err) {
                reject(err);
            }
        });
    },

    async saveMessageToDatabase(message, threadId, username) {
        // let userId = await User.findOne({
        //     username: username,
        // })
        try {

            let messageObject = {
                message: message,
                user: username,
                timestamp: Date.now(),
            }; 

            let thread = await MessageThread.findById(threadId);
            
            await MessageThread.updateOne({
                _id: threadId,
            }, {
                $push: { 
                    messages: messageObject,
                }
            });

            return messageObject;
        } catch (err) {
            //TODO tell the client that an error has occurred. maybe.
            console.error(err);
        }
    },
}