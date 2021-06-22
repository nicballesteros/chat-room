//Nic Ballesteros
//Created 06/17/21

//Require the mongo driver.
const mongoose = require('mongoose');

//Get the environment variables from the .env file.
require('dotenv').config();

//When the application connects to the mongodb server.
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

//When the application disconnected from the mongodb server.
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

/**
 *  @description This function connects to the mongodb server. This is an async
 *  function.
 */
async function connect() {
    try {
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            auth: {
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
            }
        });
    } catch (err) {
        console.error(err);
    }
}

//Call the connect function.
connect();