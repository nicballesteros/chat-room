const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, 'keys', 'id_rsa_priv.pem');
const pathToPubKey = path.join(__dirname, 'keys', 'id_rsa_pub.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const mongoose = require('mongoose');
const User = mongoose.model('User');


function validPassword(password, hash, salt) {
    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash,
    };
}

function issueJWT(user) {
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
        expiresIn: expiresIn,
        algorithm: 'RS256',
    });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn,
    }
}

async function authSocket(token, threadId) {
    try {
        //Check to see that valid values were passed.
        if (token == null || threadId == null) {
            throw new Error('The token and threadId mustn\'t be null.')
        }

        //Get the 'Bearer ' and the actual token split.
        token = token.split(' ');

        //Check that the jwt is in the correct format.
        if (token.length !== 2 || token[0] !== 'Bearer' || token[1].match(/\S+\.\S+\.\S+/) == null) {
            throw new Error('The token is not in the correct format.');
        }

        //Get only the important part and not the 'Bearer ' part.
        token = token[1];

        //Decode the jwt and get the user id from it.
        let jwt = jsonwebtoken.verify(token, PUB_KEY, {
            algorithms: ['RS256'],
        });

        //Get the user from the database.
        let user = await User.findById(jwt.sub);

        //See if the user has access to this thread.
        for (let i = 0; i < user.threads.length; i++) {
            if (user.threads[i].toString() === threadId) {
                //If so, return true.
                return {
                    authenticated: true,
                    user: user,
                };
            }
        }

        //Else return false.
        return {
            authenticated: false,
        };
    } catch (err) {
        console.error(err);
        return {
            authenticated: false,
        };
    }

    
}

module.exports = {
    validPassword: validPassword,
    genPassword: genPassword,
    issueJWT: issueJWT,
    authSocket: authSocket,
}