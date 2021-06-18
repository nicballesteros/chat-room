//Originally Written by Zach Gollwitzer. 
//https://github.com/zachgoll/express-jwt-authentication-starter/generateKeyPair.js

const crypto = require('crypto');
const fs = require('fs');

function genKeyPair() {
    //Generate a key pair.
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });

    //Write the keys to files.
    fs.writeFileSync(`${__dirname}/id_rsa_pub.pem`, keyPair.publicKey);

    fs.writeFileSync(`${__dirname}/id_rsa_priv.pem`, keyPair.privateKey);
}

genKeyPair();